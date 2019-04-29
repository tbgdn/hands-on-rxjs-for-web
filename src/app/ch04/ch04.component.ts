import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-ch04',
  templateUrl: './ch04.component.html',
  styleUrls: ['./ch04.component.css']
})
export class Ch04Component implements OnInit {
  subs: Subscription[] = [];
  constructor() {}

  ngOnInit() {
  }

  clearSubscriptions() {
    this.subs.map(s => s.unsubscribe());
  }

  ngOnDestroy() {
    this.clearSubscriptions();
  }
}
