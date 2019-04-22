import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConnectableObservable, defer, interval, Observable, of, range, Subscription, timer} from 'rxjs';
import {publish, publishReplay, take} from 'rxjs/operators';

@Component({
  selector: 'app-ch02',
  templateUrl: './ch02.component.html',
  styleUrls: ['./ch02.component.css']
})
export class Ch02Component implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  constructor() { }

  ngOnInit() {
    this.manualCreationExample();
    this.deferExample();
    this.moreBuiltInsExample();
    this.hotAndColdExample();
  }

  manualCreationExample() {
    const observable =  Observable.create((observer) => {
      let counter = 0;
      const intervalId = setInterval(() => {
        if (counter < 5) {
          observer.next('hi');
        } else {
          observer.complete();
        }
        counter ++;
      }, 1000);
    });

    observable.subscribe(
      console.log,
      console.warn,
      () => console.log('Completed!')
    );
  }

  deferExample() {
    const ObservableFactory = (n) => of(n);
    let counter = 0;
    const source$ = defer(() => ObservableFactory(counter ++));

    source$.subscribe((data) => console.log(`1: ${data}`));
    source$.subscribe((data) => console.log(`2: ${data}`));
  }

  moreBuiltInsExample() {
    this.subs.push(
      interval(1000).subscribe((x) => console.log(`interval: ${x}`))
    );
    this.subs.push(
      range(0, 5).subscribe((x) => console.log(`range: ${x}`))
    );
    this.subs.push(
      timer(500, 1000).subscribe((x) => console.log(`timer: ${x}`))
    );
  }

  hotAndColdExample() {
    const source$ = interval(1000).pipe(take(5), publishReplay(2)) as ConnectableObservable<any>;
    source$.connect();
    source$.subscribe((x) => console.log(`Observer 1 [cold]: ${x}`));
    setTimeout(() => {
      source$.subscribe((x) => console.log(`Observer 2 [hot]: ${x}`));
    }, 4000);
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }
}
