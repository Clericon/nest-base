FROM node:16.1-alpine@sha256:8704247878fe10eddfcb5c26540112b15e50d21ce8e5c7a7f6caf5cf857de219 as development

WORKDIR /usr/app

COPY package*.json ./

RUN yarn add glob rimraf

RUN yarn

COPY . .

RUN yarn run build

FROM node:16.1-alpine@sha256:8704247878fe10eddfcb5c26540112b15e50d21ce8e5c7a7f6caf5cf857de219 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package*.json ./

RUN yarn --only=production

COPY . .

COPY --from=development /usr/app/dist ./dist

CMD ["node", "dist/main"]