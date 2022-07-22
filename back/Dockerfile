FROM node:16.14.0
WORKDIR /back
RUN apt-get update || : && apt-get install python -y
ENV PATH /back/node_modules/.bin:$PATH
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
CMD ["yarn", "start"]