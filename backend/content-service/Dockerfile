# Use Node.js LTS as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose the service port
EXPOSE 5002

# Run the microservice
CMD ["node", "server.js"]

#This makes sure the service account file exists inside container.
COPY firebase-service-account.json ./firebase-service-account.json

