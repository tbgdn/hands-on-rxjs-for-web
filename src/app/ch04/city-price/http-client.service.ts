import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

export class HttpClientService {

  constructor() { }

  getCitiesInfo() {
    return of({
      London: 25,
      Paris: 30,
      Rome: 35
    }).pipe(delay(1000));
  }

  getTaxCoefficients() {
    return of([1, 1.2, 1.5]).pipe(delay(1500));
  }
}
