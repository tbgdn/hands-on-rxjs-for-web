import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {retry} from 'rxjs/operators';

@Component({
  selector: 'app-ch05',
  templateUrl: './ch05.component.html',
  styleUrls: ['./ch05.component.css']
})
export class Ch05Component implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  constructor() { }

  ngOnInit() {
  }

  retryExample() {
    this.subs.push(
      ajax('http://127.0.0.1:4001/list-data-retry').pipe(retry(4)).subscribe(
        response => console.log(`Got data:`, response.response),
        console.warn
      )
    );
  }

  clearSubscriptions() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnDestroy() {
    this.clearSubscriptions();
  }

}
