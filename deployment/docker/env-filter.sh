#!/bin/bash
cp .env.example .env
#sed -i "s/{{ token-storage-key }}/$token_storage_key/g" deployment/docker/run.sh