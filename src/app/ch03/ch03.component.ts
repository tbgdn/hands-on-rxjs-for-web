import {Component, OnInit} from '@angular/core';
import {EMPTY, from, interval, of, Subscription, timer} from 'rxjs';
import {
  buffer,
  bufferTime,
  bufferToggle,
  bufferWhen,
  catchError,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  scan,
  take,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'app-ch03',
  templateUrl: './ch03.component.html',
  styleUrls: ['./ch03.component.css']
})
export class Ch03Component implements OnInit {
  subs: Subscription[] = [];
  constructor() {}

  ngOnInit() {
  }

  mapExample() {
    this.subs.push(
      interval(500).pipe(
        map(x => x * 2)
      ).subscribe(x => console.log(`Mapped value: ${x}`))
    );
  }

  filterExample() {
    this.subs.push(
      interval(500).pipe(
        filter(x => x % 2 !== 0)
      ).subscribe(x => console.log(`Filtered value: ${x}`))
    );
  }

  catchErrorExample() {
    this.subs.push(
      interval(500).pipe(
        take(4),
        map(x => {
          if (x == 2){
            throw {code: 404, message: 'not found'}
          } else {
            return x;
          }
        }),
        catchError(err => of(err.code))
      ).subscribe(
        data => console.log(`Got data: ${data}`),
        error => console.log(`Got error:`, error),
      )
    )
  }

  distinctUntilChangedExample() {
    this.subs.push(
      from([1,2,3,4,4,5]).pipe(
        distinctUntilChanged()
      ).subscribe(console.log)
    );
    this.subs.push(
      from([ {v: 1}, {v: 2}, {v: 2}, {v: 3} ]).pipe(
        //distinctUntilChanged((left, right) => left.v === right.v)
        distinctUntilChanged(null, item => item.v)
      ).subscribe(console.log)
    );
  }

  distinctExample() {
    this.subs.push(
      from([ {v: 1}, {v: 2}, {v: 2}, {v: 3}, {v: 2} ]).pipe(
        distinct(item => item.v)
      ).subscribe(console.log)
    );
  }

  distinctUntilKeyChanged() {
    this.subs.push(
      from([ {v: 1}, {v: 2}, {v: 2}, {v: 3} ]).pipe(
        distinctUntilKeyChanged('v')
      ).subscribe(console.log)
    );
  }

  scanExample() {
    this.subs.push(
      from([1,2,3,4,5]).pipe(
        scan((acc, next) => acc + next, 0),
        tap(x => console.log(`Scanned: ${x}`)),
        map((x, index) => x / (index + 1))
      ).subscribe(console.log)
    );
  }

  bufferCountExample() {
    this.subs.push(
      timer(0, 300).pipe(
        // bufferCount(3, 3)
        // bufferCount(2, 3)
        // bufferCount(3, 2)
        bufferTime(1000)
      ).subscribe(console.log)
    );
  }

  bufferExample() {
    this.subs.push(
      timer(0, 250).pipe(
        buffer(interval(1000))
      ).subscribe(console.log)
    );
  }

  bufferWhenExample() {
    this.subs.push(
      timer(0, 250).pipe(
        bufferWhen(() => interval(500 + Math.random() * 2000))
      ).subscribe(console.log)
    );
  }

  bufferToggleExample() {
    this.subs.push(
      interval(200).pipe(
        bufferToggle(
          interval(1000),
          //val => interval(500)
          val => val % 2 === 0 ? interval(500) : EMPTY
        )
      ).subscribe(console.log)
    );
  }

  clearSubscriptions() {
    this.subs.map(s => s.unsubscribe());
  }

  ngOnDestroy() {
    this.clearSubscriptions();
  }

}
