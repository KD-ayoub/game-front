FROM node:20.6.1

# Set the working directory in the container
RUN mkdir /home/app

WORKDIR /home/app

COPY package*.json .

COPY . .

EXPOSE 3000

RUN chmod +x ./script.sh

RUN npm install

CMD [ "./script.sh" ] 