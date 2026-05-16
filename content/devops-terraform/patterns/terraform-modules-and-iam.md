# Terraform modules, IAM scoping, and multi-account state

## 1. Module skeleton — what every reusable module looks like

```
modules/ecs-service/
  main.tf
  variables.tf
  outputs.tf
  versions.tf
  README.md
  examples/
    simple/
      main.tf
      versions.tf
```

### `versions.tf` — pin everything

```hcl
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40"
    }
  }
}
```

### `variables.tf` — type + description on every variable

```hcl
variable "name" {
  type        = string
  description = "Service name. Used to prefix every resource. snake_case."
}

variable "image_uri" {
  type        = string
  description = "Full ECR image URI including tag. e.g. 123456789012.dkr.ecr.us-east-1.amazonaws.com/app:v1.2.3"
}

variable "container_port" {
  type        = number
  description = "Port the container listens on inside the task."
  default     = 8080
}

variable "desired_count" {
  type        = number
  description = "Desired number of running tasks. Autoscaling can override at runtime."
  default     = 2
}

variable "vpc_id" {
  type        = string
  description = "VPC the service runs in."
}

variable "subnet_ids" {
  type        = list(string)
  description = "Private subnet IDs across at least 2 AZs."
}

variable "tags" {
  type        = map(string)
  description = "Tags applied to every resource created by this module."
  default     = {}
}
```

### `outputs.tf` — expose only what consumers need

```hcl
output "service_arn" {
  description = "ARN of the ECS service."
  value       = aws_ecs_service.this.id
}

output "task_role_arn" {
  description = "ARN of the task role. Attach additional policies to this from the caller."
  value       = aws_iam_role.task.arn
}

output "log_group_name" {
  description = "CloudWatch log group name. Subscribe lambdas or shippers to this."
  value       = aws_cloudwatch_log_group.this.name
}
```

### `examples/simple/main.tf` — minimum-viable use

```hcl
module "api" {
  source = "../.."

  name           = "api"
  image_uri      = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/api:latest"
  container_port = 8080
  vpc_id         = data.aws_vpc.default.id
  subnet_ids     = data.aws_subnets.private.ids

  tags = {
    Environment = "dev"
    Service     = "api"
  }
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}
data "aws_vpc" "default" { default = true }
data "aws_subnets" "private" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}
```

---

## 2. IAM policy — least-privilege scoping

A task role for an app that reads from one S3 bucket and writes to one SQS queue. Wrong-vs-right.

### Wrong — vendor copy/paste

```hcl
# DO NOT MERGE
resource "aws_iam_role_policy" "task_admin" {
  role = aws_iam_role.task.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "*"
      Resource = "*"
    }]
  })
}
```

This is `AdministratorAccess`. The blast radius is the entire account.

### Right — scoped

```hcl
data "aws_iam_policy_document" "task" {
  statement {
    sid     = "ReadAppBucket"
    actions = [
      "s3:GetObject",
      "s3:ListBucket",
    ]
    resources = [
      aws_s3_bucket.app.arn,
      "${aws_s3_bucket.app.arn}/*",
    ]
  }

  statement {
    sid     = "WriteWorkQueue"
    actions = [
      "sqs:SendMessage",
      "sqs:GetQueueUrl",
    ]
    resources = [aws_sqs_queue.work.arn]
  }

  statement {
    sid     = "ReadAppSecret"
    actions = ["secretsmanager:GetSecretValue"]
    resources = [aws_secretsmanager_secret.app.arn]
    condition {
      test     = "StringEquals"
      variable = "aws:SourceAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }
  }
}

resource "aws_iam_role_policy" "task" {
  role   = aws_iam_role.task.id
  policy = data.aws_iam_policy_document.task.json
}
```

Blast radius: one bucket's contents (read), one queue (send), one secret (read). Verifiable by `aws iam simulate-principal-policy`.

---

## 3. Multi-account state — how the directories wire together

```
infra/
  accounts/
    prod/
      backend.tf      # backend "s3" { bucket = "myorg-tfstate-prod", key = "app-api.tfstate", ... }
      providers.tf    # provider "aws" { assume_role { role_arn = "arn:aws:iam::PROD_ID:role/terraform" } }
      main.tf         # module "app_api" { source = "../../modules/ecs-service", ... }
      variables.tf
    staging/
      backend.tf      # bucket = "myorg-tfstate-staging", key = "app-api.tfstate"
      providers.tf    # assume_role into STAGING_ID
      main.tf
  modules/
    ecs-service/
    vpc/
    rds-aurora/
```

### `accounts/prod/backend.tf`

```hcl
terraform {
  backend "s3" {
    bucket         = "myorg-tfstate-prod"
    key            = "app-api.tfstate"
    region         = "us-east-1"
    dynamodb_table = "myorg-tfstate-locks-prod"
    encrypt        = true
    # KMS key is set by bucket default encryption; no need to specify here.
  }
}
```

### `accounts/prod/providers.tf`

```hcl
provider "aws" {
  region = "us-east-1"

  assume_role {
    # CI principal assumes this role in the prod account.
    role_arn     = "arn:aws:iam::${var.account_id}:role/terraform-apply"
    session_name = "tf-ci-${var.commit_sha}"
  }

  default_tags {
    tags = {
      ManagedBy   = "terraform"
      Environment = "prod"
      Repo        = "myorg/infra"
    }
  }
}
```

### Why one state file per service

- Smaller state = faster `plan` (~30s vs ~5min on a monolith)
- Blast radius of a bad apply is one service, not everything
- Teams own their state file; platform owns the VPC/EKS state
- Cross-state references go through `terraform_remote_state` data source or, better, AWS resource lookups (`data.aws_vpc.by_tag`)

---

## 4. Drift detection + import for legacy resources

### Drift detection in CI (nightly)

```bash
# .github/workflows/drift.yml runs this per state file
terraform -chdir=accounts/prod init -input=false
terraform -chdir=accounts/prod plan -detailed-exitcode -lock=false
# exit code 0 = no changes, 1 = error, 2 = drift detected
```

Exit code 2 → post to Slack with the diff. Investigate, don't auto-apply.

### Importing a legacy resource

Someone created an S3 bucket in the console two years ago. It's now in production. You need it in Terraform.

```bash
# 1. Write the resource block matching reality.
cat >> main.tf <<'EOF'
resource "aws_s3_bucket" "legacy_logs" {
  bucket = "myorg-prod-app-logs-2022"
}

resource "aws_s3_bucket_versioning" "legacy_logs" {
  bucket = aws_s3_bucket.legacy_logs.id
  versioning_configuration {
    status = "Enabled"
  }
}
EOF

# 2. Import.
terraform import aws_s3_bucket.legacy_logs myorg-prod-app-logs-2022
terraform import aws_s3_bucket_versioning.legacy_logs myorg-prod-app-logs-2022

# 3. Plan and reconcile.
terraform plan
# Expect: 0 changes if your .tf matches reality. If diffs, adjust .tf
# (NOT the bucket) until plan is empty. THEN commit.
```

Rule: never let `terraform import` introduce changes on the first plan. If there are diffs, your `.tf` is wrong, not the real resource. Match reality, then commit. After that, you can iterate.
