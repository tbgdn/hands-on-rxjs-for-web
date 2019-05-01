import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Ch02Component} from './ch02/ch02.component';
import {Ch03Component} from './ch03/ch03.component';
import {Ch04Component} from './ch04/ch04.component';
import {Ch05Component} from './ch05/ch05.component';

const routes: Routes = [
  { path: '', redirectTo: 'ch02', pathMatch: 'full'},
  { path: 'ch02', component: Ch02Component },
  { path: 'ch03', component: Ch03Component },
  { path: 'ch04', component: Ch04Component },
  { path: 'ch05', component: Ch05Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
