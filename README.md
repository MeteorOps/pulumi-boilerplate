# startops
A full DevOps boilerplate for startups

## Prerequisites
 - Create an AWS account
 - Create a Pulumi account
 - Install the AWS CLI
 - Install the Pulumi CLI
 - Install the NPM CLI
 - Run `pulumi login` into your Pulumi account
 - Set the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY env vars
 - Step into the `pulumi/base` dir and run `npm i` & run `pulumi up -s dev`
 - Step into the `pulumi/apps` dir and run `npm i` & run `pulumi up -s dev`
 - CD into the 'pulumi' directory and run `pulumi up -C base -s dev`
 - CD into the 'pulumi' directory and run `pulumi up -C apps -s dev`
