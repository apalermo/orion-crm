FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/microcrm/browser /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]