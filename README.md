# startops
A full DevOps boilerplate for startups

## Prerequisites

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

## Deploy
 - Step into the `pulumi/base` dir and run `npm i` & run `pulumi up -s dev`
 - Step into the `pulumi/apps` dir and run `npm i` & run `pulumi up -s dev`
 - CD into the 'pulumi' directory and run `pulumi up -C base -s dev`
 - CD into the 'pulumi' directory and run `pulumi up -C apps -s dev`
