docker rm -f dev-emet-dashboard
docker run -d \
    --name dev-emet-dashboard \
    -p 81:80 \
    -e VITE_API_BASE_URL="https://api-dev.momofin.com/emet_dashboard" \
    -e TOKEN_STORAGE_KEY="{{ token-storage-key }}" \
    --restart always \
    --pull=always \
    ghcr.io/momofin/dev-emet-dashboard:latest