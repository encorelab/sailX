FROM rethinkdb:2.3.1
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash ; apt-get install -y nodejs
RUN npm install -g horizon
COPY .hz /.hz
COPY dist /dist
WORKDIR /
CMD rethinkdb & /usr/bin/hz serve --bind all
EXPOSE 28015 8080 8181

