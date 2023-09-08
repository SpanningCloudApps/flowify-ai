FROM node:18.12.1-alpine as worker_builder
LABEL stage=worker_builder
WORKDIR /opt/build
COPY ./ .
RUN npm install -timeout=300000
RUN npm run build


FROM node:18.12.1-alpine
ARG NODE_CUSTOM_CONFIG_DIR
ARG NODE_CUSTOM_ENV
ENV NODE_DEFAULT_CONFIG_DIR config
ENV NODE_CONFIG_DIR=${NODE_DEFAULT_CONFIG_DIR}:${NODE_CUSTOM_CONFIG_DIR}
# Used for config files
ENV NODE_ENV=$NODE_CUSTOM_ENV
WORKDIR /opt/app
RUN apk add --no-cache tini
RUN addgroup -g 5005 -S spanning && adduser -S spanning -G spanning -u 5005 && chown spanning:spanning .
COPY --from=worker_builder /opt/build/ ./
USER spanning
ENTRYPOINT [ "/sbin/tini","--", "./bin/run", "workflow-listener" ]
