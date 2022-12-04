# stage 1

FROM node:16 AS my-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=my-app-build /app/dist/v1 /usr/share/nginx/html
EXPOSE 4200
