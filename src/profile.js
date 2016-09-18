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
    this.amount = params.amount;
    this.percentage = params.percentage;
    this.time = params.time;
  }

  create() {
    let params = {
      amount: this.amount,
      percentage: this.percentage,
      time: this.time
    };
    return Bergator.post('loan', params);
  }
}

export { Loan, Profile };
