# Use an official Node.js image (alpine is lightweight)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better Docker caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose the backend port (for AWS ECS)
EXPOSE 3000

# Start the backend server
CMD ["node", "index.js"]
