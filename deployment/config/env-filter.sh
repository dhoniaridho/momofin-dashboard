#!/bin/bash

# path
dockerfile_path="Dockerfile"

# deployment
sed -i "s|{{ VITE_API_BASE_URL }}|$VITE_API_BASE_URL|g" $dockerfile_path
sed -i "s|{{ TOKEN_STORAGE_KEY }}|$TOKEN_STORAGE_KEY|g" $dockerfile_path
sed -i "s|{{ VITE_APP_ENV }}|$VITE_APP_ENV|g" $dockerfile_path
sed -i "s|{{ VITE_COOKIE_SECURE }}|$VITE_COOKIE_SECURE|g" $dockerfile_path
sed -i "s|{{ VITE_COOKIE_STORAGE_KEY }}|$VITE_COOKIE_STORAGE_KEY|g" $dockerfile_path
