"use strict";

require('babel-register');

import 'sugar';

import express from 'express';
import {Server} from 'http';
import bodyParser from 'body-parser';

import socketIO from 'socket.io';

import { LOG } from './wrappers/logger';
import { Profile } from './src/profile'


const app = express();
const http = Server(app);
app.set('views', './client/views');
app.set('view engine', 'pug');
app.use(express.static('client/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render('index', { 'hello': 'world' });
});
app.get("/profile/:profileId", (req, res) => {
  res.render('profile', { profile: Profile.get(req.params.profileId) });
});

const sockets = socketIO(http);

sockets.on('connection', (socket) => {
  LOG.debug(`new client: ${socket.id}`);


  socket.on('find person', (msg) => {
    debugger;
    if (msg.length == 0) {
      socket.emit('find person error', {error: 'empty query'});
      return;
    }
    socket.emit('person found', {id: 'test_id'});
  });
});

const listener = http.listen(2042, () => {
  LOG.info(`Starting HTTP-server on ${listener.address().address}:${listener.address().port}`);
});
