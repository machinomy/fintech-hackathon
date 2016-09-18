"use strict";

require('babel-register');

import 'sugar';

import express from 'express';
import {Server} from 'http';
import bodyParser from 'body-parser';

import socketIO from 'socket.io';

import { LOG } from './wrappers/logger';
import { Payment, Loan, Profile } from './src/profile';

const app = express();
const http = Server(app);
app.set('views', './client/views');
app.set('view engine', 'pug');
app.use(express.static('client/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app
  .get("/", (req, res) => {
    res.render('index');
  })
  .get("/profile/:uuid", (req, res) => {
    let getPersonReq = Profile.fetch(req.params.uuid);
    let getLoansReq = Profile.getLoans(req.params.uuid);

    Promise.all([getPersonReq, getLoansReq]).then((responses) => {
      LOG.warn(responses);
      let personInfo = responses[0].AddPerson;
      let creditsList = responses[1].credits;
      personInfo.img = '../images/ava.png';
      personInfo.uuid = req.params.uuid;
      res.render(
        'profile', {
          profile: personInfo,
          loanList: creditsList
        }
      );
    });

  });

const sockets = socketIO(http);

sockets.on('connection', (socket) => {
  LOG.debug(`new client: ${socket.id}`);

  socket.on('find person', (msg) => {
    if (msg.length == 0) {
      socket.emit('find person error', {error: 'empty query'});
      return;
    }
    let searchReq = Profile.search(msg);
    searchReq.then((body) => {
      LOG.debug(`search response: ${body}`);
      socket.emit('person found', {uuid: body.uuid});
    });
  });

  socket.on('new person', (params) => {
    if (params === undefined) {
      socket.emit('new person error', {error: 'empty query'});
      return;
    }
    let person = new Profile(params);
    let createReq = person.create();
    createReq.then((body) => {
      socket.emit('person created', body);
    });
  });

  socket.on('new loan', (params) => {
    if (params === undefined) {
      socket.emit('new loan error', {error: 'empty query'});
      return;
    }
    let loan = new Loan(params);
    let createReq = loan.create();
    createReq.then((body) => {
      socket.emit('loan created', body);
    });
  });

  socket.on('new payment', (params) => {
    if (params === undefined) {
      socket.emit('new payment error', {error: 'empty query'});
      return;
    }
    let payment = new Payment(params);
    let createReq = payment.create();
    createReq.then((body) => {
      socket.emit('payment created', body);
    });
  });

  socket.on('check loan eligibility', (msg) => {
    let response = null;
    if (msg.amount > 300) {
      response = {result: 'decline'}
    } else {
      response = {result: 'accept'}
    }
    socket.emit('check loan result', response);
  });
});

const listener = http.listen(2042, () => {
  LOG.info(`Starting HTTP-server on ${listener.address().address}:${listener.address().port}`);
});
