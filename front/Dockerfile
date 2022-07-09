FROM node:16.14.0-alpine
RUN mkdir /front
WORKDIR /front
ENV PATH /front/node_modules/.bin:$PATH
COPY package.json .
COPY yarn.lock .
RUN yarn install
CMD ["yarn", "build"]