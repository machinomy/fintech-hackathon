"use strict";

import { LOG } from '../wrappers/logger';

const getLoanListOpts = (profile) => {
  return {
    name: 'wot' //profile.getFullQuery()
  }
};

const loans = [
  {
    id: 1,
    amount: 785200,
    percentage: 5,
    currency: 'USDEUR',
    date: '99.99.9999',
    time: '0',
    status: 'bad',
    active: false
  },
  {
    id: 2,
    amount: 30000000,
    percentage: 5,
    currency: 'USDEUR',
    date: '21.06.5789',
    time: '12',
    status: 'good'
  },
  {
    id: 3,
    amount: 300,
    percentage: 3,
    date: '78.89.1239',
    time: '99999',
    status: 'open',
    currency: 'USDEUR',
    active: true
  }
];

const LoanList = {
  get: (profile) => {
    // profile ne nuzhni
    return loans.map((loanParams) => {
      return new Loan(loanParams);
    });
  }
};

class Loan {
  constructor(parameters) {
    this.id = parameters.id;
    this.amount = parameters.amount;
    this.percentage = parameters.percentage;
    this.currency = parameters.currency;
    this.date = parameters.date;
    this.time = parameters.time;
    this.status = parameters.status;
    this.active = parameters.active;
  }
}

export { Loan, LoanList };
