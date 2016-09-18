"use strict";

import rp from 'request-promise';

const base = 'http://localhost:9000/';

const endpoints = {
  profile: 'persons/',
  loans: 'loans/'
};

const doPostAnyway = (uri, opts) => {
  const query = {
    method: 'POST',
    uri: uri,
    body: opts,
    headers: {},
    json: true
  };

  return rp(query);
};

export const Bergator = {
  get: (endpoint, opts) => {
    let uri = endpoints[endpoint] + 'get';
    return doPostAnyway(uri, opts);
  },

  post: (endpoint, opts) => {
    let uri = endpoints[endpoint] + 'new';
    return doPostAnyway(uri, opts);
  }
};
