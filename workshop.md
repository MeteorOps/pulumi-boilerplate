# Workshop: Scaling up E2E testing using Pulumi (Typescript)

## Goal
Enable E2E tests as your company scales up

## How
Use the "base-and-apps" Pulumi architecture to save costs and improve deployment speed

## Expected result
Flexibility and ease in deploying full environments from scratch and in customizing the development process

## When is this approach useful
1. You want developers to take part in your company's DevOps efforts
2. You want to architect a highly testable product
3. You want to support testing at multiple stages
4. You want the option of full-env deployment to recover from issues

## Tech stack choices rationale
1. Pulumi - Infrastructure-as-Code tool that supports multiple platforms
2. Typescript - Popular choice for Fullstack Developers, useful to have developers take part in DevOps efforts
3. AWS - Wide set of products and features with a consistent experience

## Instructions
1. Fork this repository and clone it
2. Follow its instructions to setup your local workspace
3. Create a 'dev' environment (base + apps)
4. Create a new Pulumi stack for a fictive PullRequest named 'pr-123'
5. Modify the code to support deploying PullRequest environments on top of the 'dev' base
6. Calculate the time and cost saved per stack 
7. Bonus: Set a TTL for the 'pr-xxx' apps environments 