"use strict";

import { Bergator } from './bergator';
import { sha256 } from 'hash.js';

class Profile {
  static fetch (uuid) {
    Bergator.get('profile', {uuid: uuid});
    return new Profile({
      name: 'Name',
      lastName: 'Last Name',
      passportNumber: 567890,
      passportSeries: 1234,
    });
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

  constructor(params) {
    this.name = params.first_name;
    this.lastName = params.last_name;
    this.passportNumber = params.passport_number;
    this.passportSeries = params.passport_series;
    this.birthDate = params.birth_date;
  }

  getFullQuery() {
    return `${this.name} ${this.lastName} ${this.passportSeries} ${this.passportNumber}`
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

export { Profile };
