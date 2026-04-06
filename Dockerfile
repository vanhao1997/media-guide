# Stage 1: Build mediaguide main app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build slide-media-team (latest from GitHub)
FROM node:20-alpine AS slide-builder
RUN apk add --no-cache git
WORKDIR /slide
RUN git clone --depth 1 https://github.com/vanhao1997/slide-media-team.git .
RUN npm install
# Set base path so all assets load correctly under /learning/slide-media-team/
RUN npx vite build --base=/learning/slide-media-team/

# Stage 3: Serve everything with Nginx
FROM nginx:alpine
# Copy mediaguide
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy slide-media-team into subpath
COPY --from=slide-builder /slide/dist /usr/share/nginx/html/learning/slide-media-team
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Slide-media-team SPA at /learning/slide-media-team/
    location /learning/slide-media-team/ {
        alias /usr/share/nginx/html/learning/slide-media-team/;
        try_files $uri $uri/ /learning/slide-media-team/index.html;
    }

    # Mediaguide SPA (catch-all)
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
