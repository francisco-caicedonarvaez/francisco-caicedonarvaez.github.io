FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn run analyze

CMD yarn run dev

# build image in current directory
# docker build -t nextjs_docker:dev .

# run a container
# docker run --publish 3000:3000 nextjs_docker:dev