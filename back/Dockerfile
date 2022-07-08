FROM node:16.14.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 5000
CMD [ "yarn", "start" ]

# FROM nginx:stable-alpine
# WORKDIR /app
# RUN mkdir ./back
# COPY ["package.json", "yarn.lock", "./back/"]
# RUN yarn install
# COPY . /back
# CMD ["yarn", "start"]