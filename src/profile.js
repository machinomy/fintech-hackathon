"use strict";

import Bergator from './bergator';
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

  constructor(params) {
    this.name = params.name;
    this.lastName = params.lastName;
    this.passportNumber = params.passportNumber;
    this.passportSeries = params.passportSeries;
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
      passportHash: this.generatePassHash()
    };
    return Bergator.post('profile', params);
  }
}

export { Profile };
