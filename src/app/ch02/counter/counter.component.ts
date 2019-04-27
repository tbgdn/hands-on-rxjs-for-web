import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {
  public counter = 0;
  public stepSize = 1;
  private clearId: any;
  private sub: Subscription;
  constructor(private store: Store<{stepValue: number}>) { }

  ngOnInit() {
    this.sub = this.store.select(state => state.stepValue)
      .subscribe((stepValue) => this.stepSize = stepValue);

    this.clearId = this.startCounter();
  }

  startCounter() {
    return setInterval(() => this.counter = this.counter + this.stepSize, 1000);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    clearInterval(this.clearId);
  }

}
