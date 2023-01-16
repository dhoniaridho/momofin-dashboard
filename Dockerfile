FROM node:16.17.0-buster as builder
WORKDIR /home
COPY . .
ENV VITE_API_BASE_URL="{{ VITE_API_BASE_URL }}"
ENV TOKEN_STORAGE_KEY="{{ TOKEN_STORAGE_KEY }}"
ENV VITE_APP_ENV="{{ VITE_APP_ENV }}"
ENV VITE_COOKIE_SECURE="{{ VITE_COOKIE_SECURE }}"
ENV VITE_COOKIE_STORAGE_KEY="{{ VITE_COOKIE_STORAGE_KEY }}"
RUN npm install && npm run build

FROM nginx
RUN mkdir /home/dist/
COPY --from=builder /home/dist/ /home/dist/
COPY deployment/config/nginx.conf /etc/nginx/conf.d/default.conf
