"use strict";

import rp from 'request-promise';

const base = 'http://localhost:9000/';

const endpoints = {
  profile: 'persons/',
  credits: 'credits/',
  payments: 'credits/payments'
};

const doPostAnyway = (uri, opts) => {
  const query = {
    method: 'POST',
    uri: uri,
    body: opts,
    json: true
  };

  console.log('query');
  console.log(query);

  return rp(query);
};

export const Bergator = {
  get: (endpoint, opts) => {
    let uri = base + endpoints[endpoint] + 'get';
    return doPostAnyway(uri, opts);
  },

  post: (endpoint, opts) => {
    let uri = base + endpoints[endpoint] + 'new';
    return doPostAnyway(uri, opts);
  },

  search: (ep, opts) => {
    let uri = base + endpoints[ep] + 'search';
    return doPostAnyway(uri, opts);
  },

  yabyrga: (ep, opts) => {
    let uri = base + endpoints[ep] + 'yabyrga';
    return doPostAnyway(uri, opts);
  }
};
