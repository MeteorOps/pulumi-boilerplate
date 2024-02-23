# pulumi-boilerplate
A pulumi-based DevOps boilerplate for startup founders

NOTE: This repository is an alpha version of this project, and is expected to go through design and implementation changes as it evolves to support community use-cases.

# Architecture
![MeteorOps Pulumi Boilerplate](https://media.licdn.com/dms/image/D4D22AQFxMkiD9ucemw/feedshare-shrink_2048_1536/0/1706096119175?e=1710979200&v=beta&t=CqaJl08Mq7aicJQnCkniAfX_4T8t9dVZebZaq_mvjTE)

## Rational
Startups regret similar things as they scale up:
 - Creating stuff manually, so it's hard to create new environments for any purpose
 - An environment deployment is costly and time-consuming, so giving up on deploying environments for testing purposes
 - For either of the reasons above, recovering from a recovering from production incidents is harder

The result of the above is neglect, and a system that's hard to maintain and develop.

## Goals
 - Minimize regret around DevOps-related decisions
 - Make it easy to spin-up a full environment with ["One-Click"](https://www.meteorops.com/blog/one-click-environment-the-ultimate-devops-goal)
 - Save costs and time by deploying multiple environments on the same "Base"

 ## Implementation
 - The `base` Pulumi Project provisions all of the resources that can be shared with multiple environments (e.g., VPC, EKS Cluster)
 - The `apps` Pulumi Project deploys all of the env-specific resources on top of the `base` resources

## Tech Stack
 - Pulumi (Typescript): Provision & deploy with idempotent code maintainable by developers
 - AWS: Manage the system in a cloud with a wide set of products, big community, and a predictable interface
 - Kubernetes: Orchestrate workloads on a platform that will support your evolving needs

# Prerequisites
### Versions
```
awscli 1.32.43
helm 3.14.1
kubectl 1.29.2
pulumi 3.106.0
nvm 0.38.0
node 21.6.2 (npm 10.2.4)
```

### AWS
 - Create an AWS account
 - Set the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env vars
 - Install the AWS CLI

### Pulumi
 - Create a Pulumi account
 - Create a Pulumi Organization
 - Replace the string "meteorops" with your organization's name in the `deploy.sh` and `pulumi/apps/Pulumi.dev.yaml` files
 - Install the Pulumi CLI
 - Run `pulumi login` into your Pulumi account
 
### NodeJS
 - Install NodeJS
 - Install the NPM CLI

# Usage
### Deploy
 - Deploy an environment by running `./deploy.sh <base-env-name> <apps-env-name>`
### Destroy
 - Destroy an apps environment by running `./destroy.sh <apps-env-name>`
 - Destroy a base environment by running `pulumi destroy -C pulumi/base -s <base-env-name> --refresh`
### Examples
```
# Deploy the full DEV environment (base + apps)
./deploy.sh dev dev

# Deploy a PR environment
./deploy.sh dev pr-123

# Destroy the PR environment
./destroy.sh pr-123

# Destroy the DEV base environment
pulumi destroy -C pulumi/base dev --refresh
```

# Request Fixes, Features
If you stumble a bug, or need a new feature, [open an issue here](https://github.com/MeteorOps/pulumi-boilerplate/issues).
Please be as descriptive as you can with your request.

# Contributing
It's straight forward:
1. Fork the repo
2. Checkout to a branch
3. Modify and test
4. Open a Pull Request

# TODO
 - [] Input validation in deploy/destroy scripts
 - [] Support Pulumi secrets on PR envs
 - [] Create a reusable app Helm chart
 - [] Deploy Prometheus + Grafana
 - [] Manage deployments with ArgoCD
 - [] Support NodeGroups with Spot Instances
 - [] Support NodeGroups with On-Demand Instances
 - [] Support using External-Secrets
 - [] Support adding a RDS to base stacks
 - [] Support NginX ingresses
 - [] Add Karpenter
 - [] Add HPA/VPA
 - [] Support IAM Roles for K8s workloads
 - [] Refactor components into Pulumi components
 # Commercial Support
 If you're thinking about implementing this boilerplate for your startup and wish to get assistance, [schedule a consultation with us on our website](https://meteorops.com/technologies/pulumi).