FROM node:16.14.0
RUN apt-get update || : && apt-get install python -y
ENV PATH /front/node_modules/.bin:$PATH
WORKDIR /front
ADD ./build ./build
COPY package.json .
COPY yarn.lock .
COPY . .
RUN yarn
CMD ["yarn", "start"]