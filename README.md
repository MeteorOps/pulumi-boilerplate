# pulumi-boilerplate
A pulumi-based DevOps boilerplate for startup founders

# Architecture
![MeteorOps Pulumi Boilerplate](https://media.licdn.com/dms/image/D4D22AQFxMkiD9ucemw/feedshare-shrink_2048_1536/0/1706096119175?e=1710979200&v=beta&t=CqaJl08Mq7aicJQnCkniAfX_4T8t9dVZebZaq_mvjTE)

## Rational
Startups regret similar things as they scale up:
 - Created stuff manually, so it's hard to create new environments for any purpose
 - An environment deployment is costly and time-consuming, so giving up on deploying environments for testing purposes
 - For either of the reasons above, recovering from a recovering from production incidents is harder

The result of the above is neglect, and a system that's hard to maintain and develop.

## Goals
 - Make it easy to spin-up a full environment with ["One-Click"](https://www.meteorops.com/blog/one-click-environment-the-ultimate-devops-goal)
 - Save costs and time by deploying multiple environments on the same "Base"

## Tech Stack
 - Pulumi (Typescript): Provision & deploy with idempotent code maintainable by developers
 - AWS: Manage the system in a cloud with a wide set of products, big community, and a predictable interface
 - Kubernetes: Orchestrate workloads on a platform that will support your evolving needs

# Prerequisites

### AWS
 - Create an AWS account
 - Set the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env vars
 - Install the AWS CLI

### Pulumi
 - Create a Pulumi account
 - Install the Pulumi CLI
 - Run `pulumi login` into your Pulumi account
 
### NodeJS
 - Install NodeJS
 - Install the NPM CLI

# Usage
### Deploy
 - Deploy an environment by running `./deploy.sh env-name`
### Destroy
 - Destroy an environment by running `./destroy.sh env-name`
