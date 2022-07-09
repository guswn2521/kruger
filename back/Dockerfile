FROM node:16.14.0-alpine
RUN mkdir /back
WORKDIR /back
ENV PATH /back/node_modules/.bin:$PATH
COPY package.json .
COPY yarn.lock .
RUN yarn install
CMD ["yarn", "start"]