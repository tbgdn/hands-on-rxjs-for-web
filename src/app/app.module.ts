import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Ch02Component } from './ch02/ch02.component';
import { Ch03Component } from './ch03/ch03.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Ch02Component,
    Ch03Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
