# Use official Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the entire project files
COPY . .

# Expose port for the microservice (each will have a different one)
EXPOSE 5000

# Default command to start the service
CMD ["node", "server.js"]
