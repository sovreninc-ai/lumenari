# Deployments, secrets, observability, and GitOps — the four shapes

## 1. Production-grade Deployment + Service + HPA + PDB

`manifests/base/deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app.kubernetes.io/name: myapp
    app.kubernetes.io/instance: myapp
    app.kubernetes.io/version: "1.2.3"
    app.kubernetes.io/part-of: platform
spec:
  replicas: 3
  revisionHistoryLimit: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
      maxSurge: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: myapp
  template:
    metadata:
      labels:
        app.kubernetes.io/name: myapp
        app.kubernetes.io/instance: myapp
        app.kubernetes.io/version: "1.2.3"
    spec:
      serviceAccountName: myapp
      automountServiceAccountToken: true   # set false if the pod doesn't call k8s API
      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        fsGroup: 10001
        seccompProfile:
          type: RuntimeDefault
      topologySpreadConstraints:
        - maxSkew: 1
          topologyKey: topology.kubernetes.io/zone
          whenUnsatisfiable: ScheduleAnyway
          labelSelector:
            matchLabels:
              app.kubernetes.io/name: myapp
      containers:
        - name: app
          # Pinned by tag here; the prod overlay patches to a digest for true immutability.
          image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp:v1.2.3
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 8080
          envFrom:
            - secretRef:
                name: myapp-db    # populated by ExternalSecret (see §2)
          resources:
            requests:
              cpu: 100m
              memory: 256Mi
            limits:
              memory: 512Mi
              # NO cpu limit — throttling tends to hurt latency more than it helps
          livenessProbe:
            httpGet:
              path: /healthz
              port: http
            initialDelaySeconds: 10
            periodSeconds: 10
            timeoutSeconds: 2
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /readyz
              port: http
            initialDelaySeconds: 2
            periodSeconds: 5
            timeoutSeconds: 2
            failureThreshold: 3
          startupProbe:
            httpGet:
              path: /healthz
              port: http
            periodSeconds: 5
            failureThreshold: 30   # allows 150s for slow boots
          securityContext:
            readOnlyRootFilesystem: true
            allowPrivilegeEscalation: false
            capabilities:
              drop: ["ALL"]
          volumeMounts:
            - name: tmp
              mountPath: /tmp
      volumes:
        - name: tmp
          emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: myapp
  labels:
    app.kubernetes.io/name: myapp
spec:
  type: ClusterIP
  selector:
    app.kubernetes.io/name: myapp
  ports:
    - name: http
      port: 80
      targetPort: http
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: myapp
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app.kubernetes.io/name: myapp
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: myapp
  annotations:
    # IRSA on EKS: the SA assumes this IAM role for AWS API access.
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/myapp-task
```

---

## 2. External Secrets Operator + AWS Secrets Manager

`manifests/base/externalsecret.yaml`:

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ClusterSecretStore
metadata:
  name: aws-secrets-manager
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-east-1
      auth:
        # IRSA-bound SA in the eso namespace assumes the role to read secrets.
        jwt:
          serviceAccountRef:
            name: external-secrets
            namespace: external-secrets
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: myapp-db
spec:
  refreshInterval: 5m
  secretStoreRef:
    name: aws-secrets-manager
    kind: ClusterSecretStore
  target:
    name: myapp-db          # the in-cluster Secret that gets created
    creationPolicy: Owner
  data:
    - secretKey: DB_URL
      remoteRef:
        key: prod/myapp/db
        property: url
    - secretKey: API_KEY
      remoteRef:
        key: prod/myapp/api
        property: key
```

The Deployment references `myapp-db` via `envFrom.secretRef`. When the value in Secrets Manager changes, ESO updates the K8s Secret on `refreshInterval`. Pod picks up the change on next restart (or live via a reloader sidecar if you mount the secret as a file).

---

## 3. ServiceMonitor + PromQL alerts

`manifests/base/servicemonitor.yaml`:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: myapp
  labels:
    # release label must match the kube-prometheus-stack release for Prometheus to pick it up
    release: prometheus
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: myapp
  endpoints:
    - port: http
      path: /metrics
      interval: 30s
---
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: myapp
  labels:
    release: prometheus
spec:
  groups:
    - name: myapp.rules
      interval: 30s
      rules:
        - alert: MyappHighErrorRate
          expr: |
            sum(rate(http_requests_total{job="myapp",status=~"5.."}[5m]))
              /
            sum(rate(http_requests_total{job="myapp"}[5m]))
              > 0.05
          for: 10m
          labels:
            severity: page
          annotations:
            summary: "myapp 5xx rate > 5% for 10m"
            runbook: "https://wiki/runbooks/myapp"

        - alert: MyappHighLatencyP99
          expr: |
            histogram_quantile(
              0.99,
              sum(rate(http_request_duration_seconds_bucket{job="myapp"}[5m])) by (le)
            ) > 1
          for: 10m
          labels:
            severity: page
          annotations:
            summary: "myapp p99 latency > 1s for 10m"

        - alert: MyappCrashLooping
          expr: |
            rate(kube_pod_container_status_restarts_total{
              namespace="prod", pod=~"myapp-.*"
            }[15m]) > 0
          for: 5m
          labels:
            severity: page
          annotations:
            summary: "myapp pod restarting in last 15m"
```

---

## 4. ArgoCD Application + Kustomize overlay

`clusters/prod/apps/myapp.yaml`:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/manifests.git
    targetRevision: main
    path: overlays/prod
  destination:
    server: https://kubernetes.default.svc
    namespace: prod
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
    retry:
      limit: 5
      backoff:
        duration: 10s
        factor: 2
        maxDuration: 5m
  revisionHistoryLimit: 5
```

`manifests/overlays/prod/kustomization.yaml`:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: prod
resources:
  - ../../base
patches:
  - target:
      kind: Deployment
      name: myapp
    patch: |-
      - op: replace
        path: /spec/replicas
        value: 3
  - target:
      kind: HorizontalPodAutoscaler
      name: myapp
    patch: |-
      - op: replace
        path: /spec/minReplicas
        value: 3
      - op: replace
        path: /spec/maxReplicas
        value: 50
images:
  - name: 123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp
    newTag: v1.2.3@sha256:abc123...   # digest pinning for prod
```

Commit. ArgoCD reconciles within minutes. Future deployments are tag bumps in `overlays/prod/kustomization.yaml`, committed via PR. No `kubectl` step. Ever.
