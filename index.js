"use strict";

require('babel-register');

import 'sugar';

import express from 'express';
import {Server} from 'http';
import bodyParser from 'body-parser';

import socketIO from 'socket.io';

import { LOG } from './wrappers/logger';

const app = express();
const http = Server(app);
app.set('views', './client/views');
app.set('view engine', 'pug');
app.use(express.static('client/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render('index', { 'hello': 'world' });
});

const sockets = socketIO(http);

sockets.on('connection', (socket) => {
  LOG.debug(`new client: ${socket.id}`);

  setInterval(() => {
    socket.emit('test', `pizda govna ${new Date().toLocaleString()}`);
  }, 1000);
});

const listener = http.listen(2042, () => {
  LOG.info(`Starting HTTP-server on ${listener.address().address}:${listener.address().port}`);
});
