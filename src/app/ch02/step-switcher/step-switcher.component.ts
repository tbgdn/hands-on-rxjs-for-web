import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {StepSwitcherAction} from './step-switcher.reducer';

@Component({
  selector: 'app-step-switcher',
  templateUrl: './step-switcher.component.html',
  styleUrls: ['./step-switcher.component.css']
})
export class StepSwitcherComponent implements OnInit, OnDestroy {
  private stepSize: number = 1;
  private sub: Subscription;
  private stepOptions = [1, 5];
  constructor(private store: Store<{stepValue: number}>) { }

  ngOnInit() {
    this.sub = this.store.select(state => state.stepValue)
      .subscribe((stepValue) => {
        this.stepSize = stepValue;
        console.log(`New step size: ${this.stepSize}`);
      });
  }

  stepClick(step: number) {
    this.store.dispatch(new StepSwitcherAction(step));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
