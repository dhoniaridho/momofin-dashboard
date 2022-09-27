docker rm -f dev-emet-dashboard
docker run -d \
    --name dev-emet-dashboard \
    -p 81:80 \
    --restart always \
    --pull=always \
    ghcr.io/momofin/dev-emet-dashboard:latest