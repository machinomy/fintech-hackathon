"use strict";

class Profile {
  static fetch (id) {
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
}

export { Profile };
