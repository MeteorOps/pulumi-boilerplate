#!/usr/bin/env bash
BASE_ENV=$1
APPS_ENV=$2
PULUMI_ORG="meteorops"

echo "NOTE: Deploying ${APPS_ENV} apps on top of ${BASE_ENV} base"

pulumi org set-default $PULUMI_ORG
pulumi stack init -C "pulumi/base" -s "${PULUMI_ORG}/${BASE_ENV}"
pulumi stack init -C "pulumi/apps" -s "${PULUMI_ORG}/${APPS_ENV}"

# Create a stack config for Pull-Requests
if [[ "${APPS_ENV}" =~ ^pr-[0-9]+$ ]]; then
    if [[ ! $(pulumi stack ls -o ${PULUMI_ORG} -C "pulumi/apps" | grep "${APPS_ENV}") ]]; then
        pulumi config cp -C "pulumi/apps" -s "${PULUMI_ORG}/dev" -d "${APPS_ENV}"
    fi
fi

# Deploy the 'base' and 'apps' stacks
npm i --prefix "pulumi/base" && \
    pulumi up -C "pulumi/base" -s "${BASE_ENV}" && \
    npm i --prefix "pulumi/apps" && \
    pulumi up -C "pulumi/apps" -s "${APPS_ENV}"

# Set K8s cluster creds locally
aws eks update-kubeconfig \
    --region us-east-1 \
    --name "${BASE_ENV}-eksCluster" && \
    echo "kubeconfig updated and points to ${ENV}-eksCluster"