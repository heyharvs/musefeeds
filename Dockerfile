FROM iojs:latest

ADD ./ /tmp/musefeeds

WORKDIR /tmp/musefeeds

RUN npm install

EXPOSE 80

CMD npm start
