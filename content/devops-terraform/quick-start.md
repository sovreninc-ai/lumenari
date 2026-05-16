# Quick Start — DevOps / Terraform / AWS Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `patterns/terraform-modules-and-iam.md` into the project knowledge. Start a new conversation. First message: tell Claude your setup — "Multi-account AWS via Organizations, prod/staging/dev accounts, ECS Fargate, state in S3 + DynamoDB, applies via GitHub Actions" — then describe what you're building.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `patterns/terraform-modules-and-iam.md`. Save the GPT (private to you is fine). Open it and start with: "Multi-account AWS, ECS Fargate, state in S3. I want a reusable module for an ECS service with autoscaling."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and the file uploads.

## Gemini, Cursor, Codex, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for account topology, ECS vs EKS, and what I'm trying to do." Once it does, you're set.

For Cursor specifically: drop `SKILL.md` at the root of your infra repo. Cursor's `.cursorrules` or project rules will pick it up automatically.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Multi-account AWS (prod/staging/dev), Organizations + SSO, state in S3 + DynamoDB, applies via GitHub Actions assume-role. I need a reusable Terraform module for an ECS Fargate service: container image from ECR, ALB target group, autoscaling on CPU, CloudWatch log group, task role with read access to one S3 bucket and write to one SQS queue. Show me the module skeleton with files, variables, outputs, an examples/simple/, and the IAM policy doc with proper scoping.
```

If you get back a `modules/ecs-service/` layout with `main.tf` + `variables.tf` (each var typed + described) + `outputs.tf` + `versions.tf` (pinned) + `README.md` + `examples/simple/main.tf`, an `aws_iam_policy_document` with `s3:GetObject` scoped to the bucket ARN (not `s3:*` on `*`), a brief `plan` summary at the end, and no hardcoded account IDs — the kit is loaded right.

If you get back `"Action": "*"`, `"Resource": "*"`, or a module with hardcoded ARNs and no `examples/` directory, the system prompt didn't load — paste it again.
