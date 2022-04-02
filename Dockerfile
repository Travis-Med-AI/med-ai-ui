# base image
FROM node:12-buster

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

RUN npm install http-server -g
RUN npm run build

# start app
CMD http-server -p 4200 ./dist/med-ai-ui
