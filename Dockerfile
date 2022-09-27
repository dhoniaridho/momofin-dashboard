FROM node:16.17.0-buster as builder
WORKDIR /home
COPY . .
RUN npm install && npm run build

FROM nginx
RUN mkdir /home/dist/
COPY --from=builder /home/dist/ /home/dist/
COPY deployment/config/nginx.conf /etc/nginx/conf.d/default.conf
