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
    amount: 300,
    percentage: 5,
    currency: 'USDEUR',
    active: true
  },
  {
    id: 2,
    amount: 300000,
    percentage: 3,
    currency: 'USDEUR'
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
    this.active = parameters.active;
  }
}

export { Loan, LoanList };
