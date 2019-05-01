import { Component, OnInit } from '@angular/core';
import {HttpClientService} from './http-client.service';
import {zip} from 'rxjs';
import {take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-city-price',
  templateUrl: './city-price.component.html',
  styleUrls: ['./city-price.component.css']
})
export class CityPriceComponent implements OnInit {
  public widgetsVisibility = false;
  public citiesObject: any = {};
  public coefficientsList: number[] = [];
  constructor(private httpService: HttpClientService) { }

  ngOnInit() {
    const citiesObject$ = this.httpService.getCitiesInfo();
    const coefficientsList$ = this.httpService.getTaxCoefficients();

    zip(citiesObject$, coefficientsList$)
      .subscribe(([citiesObject, coefficientsList]) => {
        this.widgetsVisibility = true;
        this.citiesObject = citiesObject;
        this.coefficientsList = coefficientsList;
      });
  }

}
