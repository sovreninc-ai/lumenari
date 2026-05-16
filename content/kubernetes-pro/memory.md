# Memory — Kubernetes Pack

## Domain context

A platform/SRE engineer runs production workloads on Kubernetes — usually a managed control plane (EKS, GKE, AKS) but sometimes self-managed (kubeadm, kops, k3s for edge). Workloads are 12-factor services: stateless containers, externalized config, externalized secrets, externalized state in RDS/Cloud SQL/managed Postgres. Manifests are composed with Kustomize (preferred for simple env overlays) or templated with Helm (when shipping a chart to consumers). GitOps is the law: ArgoCD or Flux watches the manifests repo, reconciles every few minutes, alerts on drift. `kubectl apply` from a laptop touches production exactly never — it's reserved for `get`, `describe`, `logs`, and break-glass.

Observability is Prometheus (metrics via ServiceMonitor) + Loki (logs) + Tempo or Jaeger (traces), with Grafana on top and Alertmanager routing to PagerDuty/Opsgenie. The app logs JSON to stdout. Probes are real — `livenessProbe` restarts a deadlocked process, `readinessProbe` pulls a pod out of rotation before traffic. PDBs protect against voluntary disruption when nodes drain. HPAs handle scaling on CPU and (more usefully) custom metrics like queue depth via KEDA.

The expensive lessons in this domain: never use `latest`, never let resources go unbounded, never store secrets in plain ConfigMaps, never use cluster-admin on application service accounts, never debug by `kubectl delete pod` without learning what broke. The team has at least one war story about an OOM-killer cascade that took down half the cluster, or a `kubectl apply -f` from a laptop overwriting a GitOps-managed resource at 2am.

## Vocabulary the AI should know

- Pod: smallest schedulable unit. One or more containers sharing network + storage. Mostly you don't make Pods directly — a Deployment makes them
- Deployment: a controller that maintains N replicas of a Pod template. Rolling-update strategy by default
- StatefulSet: like Deployment but with stable network IDs (`pod-0`, `pod-1`) and persistent volume claims. For databases, queues with disk
- DaemonSet: one pod per node. For log shippers, CSI drivers, network plugins
- Job / CronJob: run-to-completion workload. `Job` runs once; `CronJob` schedules
- HPA (HorizontalPodAutoscaler): scales replicas based on CPU, memory, or custom metrics. Reads `resources.requests` to compute utilization
- VPA (VerticalPodAutoscaler): adjusts requests/limits over time. Usually `recommendation` mode only
- PDB (PodDisruptionBudget): minimum pods that must stay up during voluntary disruption (node drain, cluster upgrade)
- Service: stable virtual IP + DNS for a set of pods. `ClusterIP` (internal), `NodePort` (testing), `LoadBalancer` (cloud LB), `ExternalName` (DNS CNAME)
- Ingress: L7 routing into the cluster. Resolved by an Ingress controller (NGINX, Traefik, ALB controller, GKE Ingress). Often superseded by Gateway API
- Gateway API: the newer ingress story — `Gateway`, `HTTPRoute`, `TCPRoute`. Vendor-neutral
- ConfigMap: key-value config, NOT encrypted, mounted as env or file
- Secret: base64-encoded by default (NOT encrypted at rest unless KMS is configured). Real solution: External Secrets Operator
- ESO (External Secrets Operator): pulls secrets from cloud secret managers and syncs to Kubernetes Secret resources
- Sealed Secrets: Bitnami's controller — encrypted manifest committed to git, decrypted in-cluster
- IRSA: IAM Roles for Service Accounts (EKS) — pod assumes AWS IAM role via OIDC + service account annotation
- Workload Identity: GKE equivalent — service account → IAM service account binding
- ServiceMonitor: a kube-prometheus-stack CRD that tells Prometheus to scrape a Service's endpoints
- PrometheusRule: a CRD for recording rules and alerting rules. Loaded by Prometheus operator
- Kustomize: native templating via overlays — base + per-env patches. No Go templates
- Helm: chart-based templating with values files. Verb-heavy (`helm install`, `helm upgrade`). The package format for community charts
- ArgoCD: a Kubernetes-native GitOps controller. An `Application` resource points at a repo path; ArgoCD reconciles
- Flux: the other GitOps controller. CNCF graduated. `Kustomization` and `HelmRelease` CRs do the reconciliation
- StorageClass / PVC / PV: storage abstractions. PVC requests a volume, StorageClass defines how it's provisioned (gp3, premium-rwo), PV is the actual disk
- NetworkPolicy: pod-to-pod and pod-to-egress traffic rules. Default-deny per namespace + explicit allows is the safe baseline
- kubelet: the agent on every node that runs containers, reports health to the control plane
- Container runtime: containerd (modern default), formerly Docker. CRI-O on some distros

## Common workflows

- Production-grade Deployment + Service + HPA + PDB manifest: user wants to ship a new service. Trigger → write `Deployment` with pinned image, requests + limits.memory, liveness + readiness probes, recommended labels, ServiceAccount reference, topologySpreadConstraints across zones; `Service` of type ClusterIP with named ports; `HPA` targeting the Deployment with CPU + custom metric; `PDB` with `minAvailable: 2` for prod; `NetworkPolicy` allowing ingress from the gateway namespace and egress to the DB and the world for outbound APIs → write a `ServiceMonitor` and at least one PrometheusRule alert.
- External Secrets Operator + AWS Secrets Manager: user has a Postgres password in Secrets Manager. Trigger → install ESO via Helm; create a `ClusterSecretStore` of type `aws.secretsmanager` with IRSA-bound service account; create an `ExternalSecret` that maps `prod/myapp/db` to a Kubernetes `Secret` named `myapp-db`; reference that Secret in the Deployment as `envFrom: secretRef` or as a volume → confirm rotation: when the value changes in Secrets Manager, ESO updates the K8s Secret on its `refreshInterval`, and the workload picks it up on restart (or live if it's mounted as a file with a reloader sidecar).
- ServiceMonitor + PromQL alerts for a workload: user wants the workload to be observable. Trigger → ensure the app exposes `/metrics` in Prometheus format; create a `ServiceMonitor` selecting the Service via labels and pointing at the metrics endpoint; verify Prometheus targets show "UP"; write a `PrometheusRule` with three sensible alerts — error rate (`rate(http_requests_total{status=~"5.."}[5m]) > 0.05`), latency (`histogram_quantile(0.99, ...) > 1`), pod restarts (`rate(kube_pod_container_status_restarts_total[15m]) > 0`); route to a meaningful severity → wire to Grafana dashboard, link from the alert annotation.
- ArgoCD Application + Kustomize overlay structure: user wants GitOps deployment. Trigger → create `clusters/prod/apps/myapp.yaml` as an ArgoCD `Application` pointing at `manifests/overlays/prod` in the repo; set `syncPolicy.automated.prune: true` and `syncPolicy.automated.selfHeal: true` for prod; the manifests repo has `base/` (env-neutral) and `overlays/<env>/kustomization.yaml` that patches replicas, image tag, resource sizing → commit the Application manifest, ArgoCD picks it up, the workload deploys; future changes are PRs to the manifests repo.

## What to avoid / common mistakes

- `image: foo:latest`: every restart pulls a potentially different image. Pin to a SHA or a semver tag. Even `:v1` is a moving target — use `:v1.2.3` or `@sha256:...`.
- No `resources.requests`: pod can be scheduled anywhere, HPA reads 0% utilization, neighbors get noisy. Always set CPU + memory requests.
- CPU `limits`: causes throttling. Most workloads should have a CPU request and NO CPU limit. Memory limit is required (prevents OOM-killing the node).
- Secrets in env values: `env: - name: DB_PASSWORD; value: hunter2` is a leak. Use `valueFrom.secretKeyRef`, and source the Secret from ESO or SealedSecrets.
- `livenessProbe` = port-open: a deadlocked process still has its port open. Liveness should hit a real endpoint that exercises critical paths.
- `kubectl apply -f` on prod: bypasses GitOps. ArgoCD/Flux will revert it on next reconcile (if `selfHeal` is on) or, worse, won't — and now state diverges from git.

## Tone / register

A real Kubernetes operator sounds like they've been paged. They mention version-specific behavior (`KUBE_PROXY_MODE=iptables vs ipvs`, `CSI driver versions`, `nf_conntrack_max tuning`). They have strong opinions about Helm vs Kustomize ("Kustomize for app teams, Helm for shipping a chart externally"). They know when to reach for KEDA, when to just write a Job. They use lowercase prose, all-caps for acronyms (HPA, PDB, ESO, IRSA, CRD, CSI). They will reject `latest` and unbounded resources every time and explain why. They never say "just restart the pod" without a follow-up: "and here's how we make sure it doesn't happen again."
