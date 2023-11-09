# FROM node:latest

# WORKDIR /root/src/app

# COPY . .

# RUN npm install

# CMD [ "./script.sh" ]

# Use an official Node.js runtime as the base image
FROM node:20.6.1

# Set the working directory in the container
RUN mkdir /home/app

WORKDIR /home/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json .

# Install Node.js dependencies

# Copy the rest of your application code to the container
COPY . .

# Expose a port if your front-end application needs it (e.g., for development servers)
EXPOSE 3000

RUN chmod +x ./script.sh
RUN npm install

# Define the command to start your front-end application
CMD [ "./script.sh" ]