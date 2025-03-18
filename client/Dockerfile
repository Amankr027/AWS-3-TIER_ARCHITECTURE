# Step 1: Build React App
FROM node:18 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the full source code
COPY . .

# Build the React app with Vite
RUN npm run build

# Step 2: Serve React Build with Nginx
FROM nginx:alpine

# Copy built frontend files from the builder stage to Nginx default directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 5000
EXPOSE 5000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
