"use strict";

import { Bergator } from './bergator';
import { sha256 } from 'hash.js';

class Profile {
  static fetch (uuid) {
    return Bergator.get('profile', {uuid: uuid});
  }

  static search (query) {
    let [fName, lName, pSeries, pNum] = query.split(' ');
    let person = new Profile({
      first_name: fName,
      last_name: lName,
      passport_series: pSeries,
      passport_number: pNum
    });
    return Bergator.search('profile', {
      firstName: fName,
      lastName: lName,
      passportHash: person.generatePassHash()
    });
  }

  static getLoans (uuid) {
    return Bergator.get('credits', {uuid: uuid});
  }

  constructor(params) {
    this.name = params.first_name;
    this.lastName = params.last_name;
    this.passportNumber = params.passport_number;
    this.passportSeries = params.passport_series;
    this.birthDate = params.birth_date;
  }

  generatePassHash() {
    let passportString = this.passportNumber + this.passportSeries;
    return sha256().update(passportString).digest('hex');
  }

  create() {
    let params = {
      firstName: this.name,
      lastName: this.lastName,
      birthDate: this.birthDate,
      passportHash: this.generatePassHash()
    };
    return Bergator.post('profile', params);
  }
}

class Loan {
  constructor(params) {
    this.amount = params.credit_sum;
    this.percentage = params.percentage;
    this.time = params.time;
    this.profileUuid = params.uuid;
  }

  create() {
    let params = {
      uuid: this.profileUuid,
      credit: {
        amount: this.amount,
        percentage: this.percentage,
        time: this.time,
        date: (new Date()).toLocaleDateString()
      }
    };
    return Bergator.post('credits', params);
  }
}

class Payment {
  constructor(params) {
    this.personUuid = params.personUuid;
    this.amount = params.amount;
    this.date = params.date;
    this.creditUUID = params.creditUUID;
  }

  create() {
    let params = {
      uuid: this.personUuid,
      payment: {
        amount: this.amount,
        date: (new Date()).toLocaleDateString(),
        creditUUID: this.creditUUID
      }
    };
    return Bergator.post('credits', params);
  }
}

export { Loan, Profile };
