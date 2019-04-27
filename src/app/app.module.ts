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
    StepSwitcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
