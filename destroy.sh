#!/usr/bin/env bash
APPS_ENV=$1

pulumi destroy -C "pulumi/apps" -s "${APPS_ENV}" --refresh