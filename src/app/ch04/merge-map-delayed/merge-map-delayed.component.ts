import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription, throwError} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {delay, mergeMap, mergeMapTo} from 'rxjs/operators';

const REQUEST_URL = 'http://127.0.0.1:4001/request-data';
const RESPONSE_URL = 'http://127.0.0.1:4001/get-response?dataId=';

@Component({
  selector: 'app-merge-map-delayed',
  templateUrl: './merge-map-delayed.component.html',
  styleUrls: ['./merge-map-delayed.component.css']
})
export class MergeMapDelayedComponent implements OnInit, OnDestroy {
  private items: [];
  private subscription: Subscription;
  constructor() { }

  ngOnInit() {
    this.subscription = this.getItems(5).subscribe(
      (result: any) => this.items = result,
      (error: any) => console.warn(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getItems(maxCounter) {
    return ajax.get(REQUEST_URL).pipe(
      mergeMap(d => {
        return this.pollForResponse(d.response.dataId, maxCounter);
      }, 1)
    );
  }

  pollForResponse(dataId, maxCounter) {
    if (maxCounter === 0) {
      return throwError({message: 'max retry count exceeded'});
    } else {
      return ajax.get(RESPONSE_URL + dataId).pipe(
        mergeMap(d => {
          if (d.response.ready) {
            return of(d.response.data);
          } else {
            return of(1).pipe(
              delay(1000),
              mergeMapTo(this.pollForResponse(dataId, maxCounter - 1))
            );
          }
        }, 1)
      );
    }
  }

}
