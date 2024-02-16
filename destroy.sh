#!/usr/bin/env bash
ENV=$1

pulumi destroy -C "pulumi/apps" -s "${ENV}" && \
    pulumi destroy -C "pulumi/base" -s "${ENV}"