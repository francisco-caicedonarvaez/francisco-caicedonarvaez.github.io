FROM node:20-alpine

WORKDIR /app

COPY package*.json yarn.lock .yarnrc.yml ./

COPY .yarn ./.yarn

RUN corepack enable && corepack prepare yarn@3.6.1 --activate

RUN yarn install --immutable

COPY . .

EXPOSE 3000

RUN yarn run build

CMD ["yarn", "run", "serve"]

# build image in current directory
# docker build -t nextjs_docker:dev .

# run a container
# docker run --publish 3000:3000 nextjs_docker:dev