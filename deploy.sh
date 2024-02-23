#!/usr/bin/env bash
BASE_ENV=$1
APPS_ENV=$2
PULUMI_USER=$(pulumi whoami)

echo here
# Create a stack for Pull-Requests
if [[ "${APPS_ENV}" =~ "^pr-[0-9]+$" ]]; then
    echo here1
    if [[ ! $(pulumi stack ls "${APPS_ENV}") ]]; then
    echo here2
        pulumi stack init -s "${APPS_ENV}" --copy-config-from 
    fi
fi
echo here3
# Provide the 'apps' stack the Pulumi account
pulumi config set baseOrg "${PULUMI_USER}" -C "pulumi/apps" -s "${APPS_ENV}"
echo here4
# Deploy the 'base' and 'apps' stacks
npm i --prefix "pulumi/base" && \
    pulumi up -C "pulumi/base" -s "${BASE_ENV}" && \
    npm i --prefix "pulumi/apps" && \
    pulumi up -C "pulumi/apps" -s "${APPS_ENV}"

# 
aws eks update-kubeconfig \
    --region us-east-1 \
    --name "${BASE_ENV}-eksCluster" && \
    echo "kubeconfig updated and points to ${ENV}-eksCluster"