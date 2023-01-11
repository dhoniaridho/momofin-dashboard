#!/bin/bash

# path
deployment_path="deployment/k8s/d.yml"
service_path="deployment/k8s/s.yml"
hpa_path="deployment/k8s/h.yml"
dockerfile_path="Dockerfile"

# deployment
sed -i "s|{{ APP_NAME }}|$APP_NAME|g" $deployment_path
sed -i "s|{{ NAMESPACE }}|$NAMESPACE|g" $deployment_path
sed -i "s|{{ PORT }}|$PORT|g" $deployment_path
sed -i "s|{{ PROTOCOL }}|$PROTOCOL|g" $deployment_path
sed -i "s|{{ CPU_LIMIT }}|$CPU_LIMIT|g" $deployment_path
sed -i "s|{{ MEMORY_LIMIT }}|$MEMORY_LIMIT|g" $deployment_path
sed -i "s|{{ CPU_REQUEST }}|$CPU_REQUEST|g" $deployment_path
sed -i "s|{{ MEMORY_REQUEST }}|$MEMORY_REQUEST|g" $deployment_path
sed -i "s|{{ IMAGE_NAME }}|$IMAGE_NAME|g" $deployment_path

# service
sed -i "s|{{ APP_NAME }}|$APP_NAME|g" $service_path
sed -i "s|{{ NAMESPACE }}|$NAMESPACE|g" $service_path
sed -i "s|{{ PORT }}|$PORT|g" $service_path
sed -i "s|{{ PROTOCOL }}|$PROTOCOL|g" $service_path

# hpa
sed -i "s|{{ APP_NAME }}|$APP_NAME|g" $hpa_path
sed -i "s|{{ NAMESPACE }}|$NAMESPACE|g" $hpa_path
sed -i "s|{{ MIN_REPLICAS }}|$MIN_REPLICAS|g" $hpa_path
sed -i "s|{{ MAX_REPLICAS }}|$MAX_REPLICAS|g" $hpa_path

# dockerfile
sed -i "s|{{ TOKEN_STORAGE_KEY }}|$TOKEN_STORAGE_KEY|g" $dockerfile_path
sed -i "s|{{ VITE_APP_ENV }}|$VITE_APP_ENV|g" $dockerfile_path
sed -i "s|{{ VITE_COOKIE_SECURE }}|$VITE_COOKIE_SECURE|g" $dockerfile_path
sed -i "s|{{ VITE_COOKIE_STORAGE_KEY }}|$VITE_COOKIE_STORAGE_KEY|g" $dockerfile_path
