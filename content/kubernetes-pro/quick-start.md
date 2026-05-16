# Quick Start — Kubernetes Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `patterns/deployments-and-observability.md` into the project knowledge. Start a new conversation. First message: tell Claude your setup — "EKS, Kustomize, ArgoCD for GitOps, kube-prometheus-stack installed, ESO with AWS Secrets Manager" — then describe what you're building.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `patterns/deployments-and-observability.md`. Save the GPT (private to you is fine). Open it and start with: "EKS, Kustomize, ArgoCD. I want to ship a new HTTP service with autoscaling and observability."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and the file uploads.

## Gemini, Cursor, Codex, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for cluster type, Helm/Kustomize, GitOps tool, and what I'm building." Once it does, you're set.

For Cursor specifically: drop `SKILL.md` at the root of your manifests repo. Cursor's `.cursorrules` or project rules will pick it up automatically.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. EKS 1.30, Kustomize overlays, ArgoCD for GitOps, kube-prometheus-stack installed, External Secrets Operator with AWS Secrets Manager, IRSA configured. I need to ship "myapp" — an HTTP service on port 8080, image in ECR at v1.2.3, expects DB_URL and API_KEY from Secrets Manager. Production needs 3 replicas spread across AZs, HPA on CPU, PDB minAvailable=2, three baseline alerts. Show me the base/ manifests, the prod overlay, the ExternalSecret, and the ArgoCD Application.
```

If you get back: a `Deployment` with `image: <ecr>/myapp:v1.2.3` (pinned), `resources.requests` + `resources.limits.memory`, `livenessProbe` + `readinessProbe`, `topologySpreadConstraints`, `securityContext` with `runAsNonRoot`; an `HPA` referencing the Deployment; a `PDB` with `minAvailable: 2`; an `ExternalSecret` sourcing from AWS Secrets Manager via a `ClusterSecretStore`; a `ServiceMonitor` + `PrometheusRule` with error-rate/latency/restart alerts; a Kustomize `base/` + `overlays/prod/kustomization.yaml`; an ArgoCD `Application` with `syncPolicy.automated.prune: true, selfHeal: true` — the kit is loaded right.

If you get back `image: myapp:latest`, secrets in `env.value`, or no PDB / no ServiceMonitor, the system prompt didn't load — paste it again.
