FROM node:20-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_GA_ID
ARG API_NOVA_POST

ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV API_NOVA_POST=$API_NOVA_POST

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.27-alpine AS production

COPY --from=builder /app/out /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]