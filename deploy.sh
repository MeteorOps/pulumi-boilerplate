#!/usr/bin/env bash
ENV=$1
PULUMI_USER=$(pulumi whoami)

pulumi config set baseOrg "${PULUMI_USER}" -C "pulumi/base" -s "${ENV}"
pulumi config set baseOrg "${PULUMI_USER}" -C "pulumi/apps" -s "${ENV}"

npm i --prefix "pulumi/base" && \
    pulumi up -C "pulumi/base" -s "${ENV}" && \
    npm i --prefix "pulumi/apps" && \
    pulumi up -C "pulumi/apps" -s "${ENV}"

aws eks update-kubeconfig \
    --region us-east-1 \
    --name "${PULUMI_USER}-${ENV}-eksCluster" && \
    echo "kubeconfig updated and points to ${ENV}-eksCluster"