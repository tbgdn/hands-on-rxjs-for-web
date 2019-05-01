import {Component, OnDestroy, OnInit} from '@angular/core';
import {from, of, Subscription} from 'rxjs';
import {bufferCount, mergeAll} from 'rxjs/operators';

@Component({
  selector: 'app-ch04',
  templateUrl: './ch04.component.html',
  styleUrls: ['./ch04.component.css']
})
export class Ch04Component implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  constructor() {}

  ngOnInit() {
  }

  processingChunksExample() {
    this.subs.push(
      of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).subscribe(console.log),
      from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(
        bufferCount(2, 2)
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
