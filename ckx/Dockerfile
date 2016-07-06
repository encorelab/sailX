FROM rethinkdb:2.3.1
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash ; apt-get install -y nodejs
RUN apt-get install -y git
RUN npm install -g horizon@1.0.3
COPY .hz /.hz
COPY dist /dist
WORKDIR /
RUN rethinkdb & sleep 5 & /usr/bin/hz set-schema /.hz/schema.toml --force
CMD rethinkdb & /usr/bin/hz serve --bind all
EXPOSE 28015 8080 8181

