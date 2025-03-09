# Use official Node.js image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 5001

# Run the app
CMD ["node", "app.js"]
