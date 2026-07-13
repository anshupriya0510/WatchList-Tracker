# Use the official Node.js 22 image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Backend port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
