import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Ch02Component } from './ch02/ch02.component';
import { Ch03Component } from './ch03/ch03.component';
import { CounterComponent } from './ch02/counter/counter.component';
import { StepSwitcherComponent } from './ch02/step-switcher/step-switcher.component';
import {StoreModule} from '@ngrx/store';
import {StepSwitcherReducer} from './ch02/step-switcher/step-switcher.reducer';
import { Ch04Component } from './ch04/ch04.component';
import { AutoCompleteComponent } from './ch04/auto-complete/auto-complete.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { MergeMapDemoComponent } from './ch04/merge-map-demo/merge-map-demo.component';
import { MergeScanDemoComponent } from './ch04/merge-scan-demo/merge-scan-demo.component';
import { MergeMapDelayedComponent } from './ch04/merge-map-delayed/merge-map-delayed.component';
import { CrudDemoComponent } from './ch04/crud-demo/crud-demo.component';
import { HttpClientService } from './ch04/city-price/http-client.service';
import { CitySwitcherComponent } from './ch04/city-price/city-switcher/city-switcher.component';
import { CoefficientSwitcherComponent } from './ch04/city-price/coefficient-switcher/coefficient-switcher.component';
import { PriceViewComponent } from './ch04/city-price/price-view/price-view.component';
import { CityPriceComponent } from './ch04/city-price/city-price.component';
import {citySwitcherReducer} from './ch04/city-price/city-switcher/city-switcher.reducer';
import {coefficientSwitcherReducer} from './ch04/city-price/coefficient-switcher/coefficient-switcher.reducer';
import { Ch05Component } from './ch05/ch05.component';

const reducers = {
  stepValue: StepSwitcherReducer,
  cityPrice: citySwitcherReducer,
  coefficient: coefficientSwitcherReducer
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Ch02Component,
    Ch03Component,
    CounterComponent,
    StepSwitcherComponent,
    Ch04Component,
    AutoCompleteComponent,
    MergeMapDemoComponent,
    MergeScanDemoComponent,
    MergeMapDelayedComponent,
    CrudDemoComponent,
    CitySwitcherComponent,
    CoefficientSwitcherComponent,
    PriceViewComponent,
    CityPriceComponent,
    Ch05Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
