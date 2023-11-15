FROM node:20.6.1

RUN mkdir -p /root/src/app
WORKDIR /root/src/app
COPY package*.json .

COPY . .
RUN npm install 
CMD sh run.sh
