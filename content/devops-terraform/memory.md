# Memory — DevOps / Terraform / AWS Pack

## Domain context

A platform/DevOps engineer runs production AWS for one or more product teams. There are at least three accounts — prod, staging, dev — wired together via AWS Organizations and SSO. State lives in S3 with a DynamoDB lock table. Workloads run on ECS Fargate or EKS, fronted by ALB/NLB. Data lives in RDS Aurora Postgres, with S3 for objects and SQS/EventBridge for events. Secrets are in Secrets Manager (rotating) or Parameter Store (static). Telemetry is CloudWatch Logs + CloudWatch Metrics, often shipped to Datadog or Grafana Cloud for the team's primary view.

The rhythm is: `terraform plan` on every PR, reviewed by a peer, applied by CI to staging on merge, applied to prod after a manual approval. Drift detection runs nightly via `terraform plan -detailed-exitcode` and pings Slack on diffs. Provider versions are pinned. Module versions are pinned by tag. The repo has a `make` or `taskfile` wrapper so engineers don't memorize `terraform -chdir=accounts/prod -- plan -var-file=...`.

The expensive lessons in this domain: never share state across services, never trust `Action: *` on `Resource: *`, never run `terraform apply` from a laptop on prod, never let a stateful resource's plan show "destroy" without a migration. The team has at least one war story about a `terraform destroy` typo'd against the wrong workspace.

## Vocabulary the AI should know

- Module: a directory of `.tf` files exposing inputs (`variables.tf`) and outputs (`outputs.tf`). Reused by `module "x" { source = "..." }`
- Remote state: state file stored in S3 (or Terraform Cloud, GCS, etc.) instead of locally. Required for any team larger than one
- State lock: DynamoDB table that prevents two `apply`s racing. `terraform-state-locks` is the typical name
- Workspace: a named instance of a state file within a single backend. Useful for short-lived envs; insufficient for prod isolation
- Provider: the plugin that talks to a cloud API — `hashicorp/aws`, `hashicorp/kubernetes`, `hashicorp/helm`
- Data source: `data "aws_caller_identity" "current" {}` — read-only lookup, doesn't create anything
- Resource: `resource "aws_s3_bucket" "x" {}` — creates, updates, destroys
- Local: `locals { name = "..." }` — computed values reused in the file
- Output: a value exposed by a module for other modules or `terraform output` to consume
- Tfvars: `terraform.tfvars` or `*.auto.tfvars` — variable values. Gitignored if they contain secrets
- IRSA: IAM Roles for Service Accounts (EKS) — pods assume an IAM role via OIDC + service account annotation
- Task role: ECS task identity. Separate from execution role (which pulls images / writes logs)
- Execution role: ECS role that lets the agent pull from ECR + write to CloudWatch Logs. Standard, AWS-managed policies fine
- ECR: Elastic Container Registry. AWS's Docker registry. Per-region. Repository URI is `<acct>.dkr.ecr.<region>.amazonaws.com/<repo>`
- VPC peering / Transit Gateway: how accounts/VPCs talk privately. Peering for ≤3 VPCs, TGW for hub-and-spoke at scale
- ALB / NLB: Application LB (L7, HTTP/HTTPS) vs Network LB (L4, TCP/UDP). ALB does host/path routing, NLB does static IPs and TLS pass-through
- Secrets Manager: AWS's secret store with rotation hooks. Used for DB creds, API keys with rotation
- Parameter Store: SSM Parameter Store. Free tier, SecureString type encrypts with KMS. Good for static config
- KMS: Key Management Service. Customer-managed keys (CMKs) for cross-account, AWS-managed keys for in-account
- Terragrunt: a wrapper around Terraform — DRY backend config, reduce module-call boilerplate. Optional, often unnecessary

## Common workflows

- Reusable module skeleton: user wants to create a new module (e.g., `ecs-service`). Trigger → create `modules/ecs-service/` with `main.tf`, `variables.tf`, `outputs.tf`, `versions.tf`, `README.md`; add `examples/simple/main.tf` showing minimum-viable usage; pin `required_version` and `required_providers`; document every variable with type, default, and description; expose only what consumers need in `outputs.tf` → tag a release (`v1.0.0`) and consume by tag, not by branch.
- Multi-account state structure: user is setting up environments. Trigger → create one AWS account per env (prod, staging, dev) via Organizations; one S3 bucket for state per env, in that env's account, with versioning + KMS encryption; one DynamoDB lock table per backend; `accounts/<env>/backend.tf` references that bucket + table; provider blocks `assume_role` into the target account from the CI role → decide service granularity: one state file per logical service (vpc, eks, app-x), not one monolith.
- IAM policy with least-privilege scope: user needs a role for an ECS task to read from one S3 bucket and write to one SQS queue. Trigger → write a policy with two statements; `s3:GetObject` + `s3:ListBucket` scoped to that bucket's ARN (and `<bucket>/*` for objects); `sqs:SendMessage` scoped to that queue's ARN; no other actions; attach to the task role; verify via `aws iam simulate-principal-policy` → add a condition (`aws:SourceAccount`) if the queue is cross-account.
- Drift detection + import for legacy resources: a resource exists in AWS but not in state (created in the console long ago). Trigger → write the resource block in `.tf` with the expected config; run `terraform import aws_s3_bucket.legacy <bucket-name>`; run `terraform plan` and fix any diffs by adjusting the `.tf` to match reality; commit; schedule nightly `terraform plan -detailed-exitcode` in CI to catch future console-driven drift → never use `terraform import` blocks generated by AI without checking — they often have wrong addressable names.

## What to avoid / common mistakes

- `Action: "*"` on `Resource: "*"` IAM: equivalent to `AdministratorAccess`. Vendor docs say this when they're lazy. Scope to the specific actions and resources, every time.
- Hardcoded ARNs / account IDs / region names: makes the config single-account, single-region. Use `data.aws_caller_identity.current.account_id`, `data.aws_region.current.name`, or variables.
- Local state committed to git: leaks secrets, blocks teamwork. `terraform.tfstate*` belongs in `.gitignore`. State goes in S3 + DynamoDB.
- Plans with unexpected destroys: `terraform plan` showing `- destroy` on RDS or S3 with data is a stop-the-world moment. `lifecycle { prevent_destroy = true }` on stateful resources catches typos.
- Modules with 40 inputs: a sign the module is doing too much. Split by concern (one module for the cluster, one for the service, one for the IAM role).
- Workspaces for production isolation: workspaces share a backend and a state bucket. A prod-vs-staging boundary belongs at the AWS account level, not the workspace level.

## Tone / register

A real platform engineer sounds like they've been paged for a bad apply. They mention specific tools (`tflint`, `tfsec`, `checkov`, `terragrunt`, `atlantis`, `aws-vault`), specific resource quirks (Aurora's writer-vs-reader endpoints, EKS's coredns version pinning, ALB listener rule limit of 100), and specific failure modes ("delete_protection on the bucket meant we couldn't tear down the test env"). They use lowercase prose, capitalize acronyms (IAM, IRSA, VPC, KMS, ECR), and refer to the AWS service by its API name (`s3`, `ec2`, `iam`) not its console name. They will push back on `Action: *` and on workspace-as-environment. They quote the AWS docs occasionally but trust their `plan` output more.
