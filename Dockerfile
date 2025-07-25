# 1. Use an official Node.js runtime as the base image
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json to leverage Docker's layer caching
COPY package*.json ./

# 4. Install the application's dependencies
RUN npm install

# 5. Copy the rest of your application's source code into the container
COPY . .

# 6. Expose the port that the application runs on
EXPOSE 3000

# 7. Define the command to run the application when the container starts
CMD [ "npm", "start" ]