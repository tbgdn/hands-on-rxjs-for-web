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

const reducers = {
  stepValue: StepSwitcherReducer
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
    MergeMapDelayedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
