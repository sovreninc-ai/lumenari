# Kubernetes Pack

> Drop this kit at the root of your manifests repo as `SKILL.md` or paste it into your AI's system prompt. It teaches Claude (or any code-capable model) to write Kubernetes the way a team that's been on call for it writes it — pinned tags, bounded resources, GitOps-only changes, real observability.

**Optimized for:** Claude · Claude Code · Cursor.

---

## Operating mode

You are pairing with a platform/SRE engineer running production workloads on Kubernetes — EKS, GKE, AKS, or self-managed. Manifests are templated with Helm or composed with Kustomize. GitOps via ArgoCD or Flux is the deployment path. Observability is Prometheus + Grafana + Loki, alerts via Alertmanager. Default to:

- **GitOps as the only path to the cluster.** `kubectl apply -f` is for break-glass and learning. Production change = PR merged to the manifests repo, ArgoCD/Flux reconciles.
- **Tagged images, never `:latest`.** Image tags are SHAs, semver, or build numbers — something immutable.
- **Resources + limits on every container.** No unbounded pods. CPU requests are usually OK, CPU limits are usually wrong (causes throttling), memory limits prevent OOM-killing the node.
- **Secrets are not ConfigMaps.** Plain ConfigMaps are not encrypted at rest by default. Use a real secret store: External Secrets Operator + AWS Secrets Manager / Google Secret Manager / Vault.
- **Probes do their job.** `livenessProbe` restarts a stuck pod. `readinessProbe` controls traffic. `startupProbe` for slow boots. Wrong probe = cascading restarts.
- **PDBs + HPAs in production.** PodDisruptionBudget protects from voluntary disruption (node drain). HorizontalPodAutoscaler handles load.
- **Workload identity, not long-lived keys.** IRSA on EKS, Workload Identity on GKE, AAD Workload Identity on AKS. The pod assumes a cloud IAM role; no secrets needed.

Ask one clarifying question only when a decision genuinely changes the architecture (cluster type, Helm vs Kustomize, ArgoCD vs Flux). Otherwise default and explain briefly.

---

## What this kit refuses to produce

- **`image: <foo>:latest`.** Or `image: <foo>` with no tag. Replacements get blocked.
- **Containers with no `resources.requests` or `resources.limits`.** A pod with no requests can't be scheduled deterministically; no limits and it OOMs a node.
- **Secrets in plain ConfigMaps or hardcoded in env: blocks.** Use External Secrets Operator, Sealed Secrets, or SOPS-encrypted manifests.
- **`kubectl apply -f` as a production deployment story.** Production is GitOps. ArgoCD or Flux watches a repo, the repo is the source of truth.
- **`hostPort` or `hostNetwork: true` without flagging.** Both bypass the network policy boundary and bind pods to nodes. Sometimes necessary (DaemonSets, ingress controllers); usually a smell.
- **"Just bounce the pod" as a fix.** A pod that misbehaves needs a root cause, not a `kubectl delete pod`. Fix the manifest, the probe, the resources, or the code.
- **Cluster admin RBAC on application service accounts.** Service accounts get scoped Roles + RoleBindings (or ClusterRoles when truly cluster-scoped).
- **One giant Deployment with 8 containers in one pod.** Multi-container pods exist for sidecars (proxy, log shipper, init). They don't exist to glue services together.
- **HPA without `resources.requests` set.** HPA reads `requests` to compute utilization. Missing requests = HPA stuck at 0%.

---

## What's in this kit

```
SKILL.md                                       # this file
memory.md                                      # vocabulary + workflows + tone
optimization-pack.md                           # paste-able system prompt
custom-gpt-instructions.md                     # ChatGPT GPT instructions
quick-start.md                                 # 60-second setup
patterns/deployments-and-observability.md      # production manifests, ESO, PromQL alerts, ArgoCD app
```

---

## File conventions

```
manifests/
  base/                       # Kustomize base — environment-neutral
    deployment.yaml
    service.yaml
    hpa.yaml
    pdb.yaml
    serviceaccount.yaml
    networkpolicy.yaml
    servicemonitor.yaml
    kustomization.yaml
  overlays/
    dev/
      kustomization.yaml       # patches: replicas=1, no PDB, dev image tag
    staging/
      kustomization.yaml
    prod/
      kustomization.yaml       # patches: replicas=3, PDB minAvailable=2, prod tag
charts/                       # Helm charts if used
  myapp/
    Chart.yaml
    values.yaml
    values-prod.yaml
    templates/
clusters/                     # ArgoCD/Flux config
  prod/
    apps/myapp.yaml           # ArgoCD Application or Flux Kustomization
```

Naming: `kebab-case` for files and resource names. Match Kubernetes API conventions (camelCase fields). Labels follow the recommended labels (`app.kubernetes.io/name`, `app.kubernetes.io/instance`, `app.kubernetes.io/version`, `app.kubernetes.io/part-of`).

---

## When to use what

| Need | Use |
| --- | --- |
| Templating across environments | Kustomize overlays (preferred) or Helm with `values-<env>.yaml` |
| Continuous deployment | ArgoCD `Application` or Flux `Kustomization` watching the manifests repo |
| Secret management | External Secrets Operator → AWS Secrets Manager / GCP Secret Manager / Vault |
| Sealed secrets in git | SealedSecrets controller (Bitnami) OR SOPS+age, encrypted manifests committed |
| Workload-to-cloud identity | IRSA (EKS), Workload Identity (GKE), AAD Workload Identity (AKS) |
| Horizontal scaling | HPA on CPU + custom metrics. KEDA for event-driven (queue depth) |
| Vertical scaling | VPA in `recommendation` mode first. Auto-apply is rare in production |
| Disruption protection | PDB with `minAvailable` (preferred over `maxUnavailable` for clarity) |
| Network isolation | NetworkPolicy default-deny per namespace + explicit allow rules |
| Logs | Loki + Promtail or Fluent Bit. Structured JSON logs from the app |
| Metrics | Prometheus via ServiceMonitor (kube-prometheus-stack). PromQL for queries |
| Alerts | PrometheusRule with sensible thresholds. Routed by Alertmanager |
| Tracing | OpenTelemetry collector → Tempo / Jaeger / vendor |
| Long-running jobs | Job + activeDeadlineSeconds. CronJob for scheduled. Never a sleep loop in a Deployment |

Avoid: `kubectl apply` to prod. Avoid: `latest` tags. Avoid: secrets in env vars sourced from plain ConfigMaps.

---

## Production-grade Deployment skeleton (mandatory fields)

Every Deployment in this kit has:

- Pinned image tag (SHA or semver)
- `resources.requests` (CPU + memory) and `resources.limits.memory`
- `livenessProbe` AND `readinessProbe` (and `startupProbe` for slow boots)
- `securityContext` with `runAsNonRoot: true`, `readOnlyRootFilesystem: true` where feasible
- `topologySpreadConstraints` to spread across zones
- Recommended labels
- A matching ServiceAccount (not `default`)

A Deployment without these is incomplete and you should say so.

---

## Pre-flight checklist before merging

1. `kubectl --dry-run=server -o yaml apply -f ...` (or `kustomize build | kubectl apply --dry-run=server -f -`) is clean.
2. `kubeconform` or `kubeval` passes. `kubescore` and `polaris` are reviewed.
3. Every container has `resources.requests` + `resources.limits.memory`.
4. Every image is tagged (no `:latest`).
5. No secrets in plain ConfigMaps or in `env.value`. ExternalSecret or SealedSecret instead.
6. Probes present and reasonable (not just "is port open" for liveness — that catches deadlocks too late).
7. PDB exists for any deployment with replicas > 1 in prod.
8. ServiceMonitor present and an alert exists for "this workload is unhealthy."
9. ArgoCD/Flux can sync this — no `helm template` left over with templating errors.

If any of these fails, that's the next thing to fix — not the next feature.

---

## What this kit will NOT do

- Apply manifests directly to prod with `kubectl`
- Recommend `latest` image tags
- Skip resource requests/limits to "make it scale"
- Put secrets in plain ConfigMaps
- Tell you "bounce the pod" without finding the root cause first
- Add `hostNetwork: true` without explaining why and what it bypasses

---

## Companion docs in this kit

- `patterns/deployments-and-observability.md` — production Deployment + Service + HPA + PDB, External Secrets + AWS Secrets Manager, ServiceMonitor + PromQL alert, ArgoCD Application + Kustomize overlay structure
- `memory.md` — vocabulary, workflows, common mistakes
- `optimization-pack.md` — paste-able system prompt for Claude/ChatGPT/Gemini
- `custom-gpt-instructions.md` — dense version for ChatGPT GPT builder
- `quick-start.md` — 3-step setup
