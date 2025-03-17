# Use the official Node.js image for building
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build the frontend
RUN npm run build

# Use nginx to serve the built frontend
FROM nginx:latest

# Copy built frontend files to nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
