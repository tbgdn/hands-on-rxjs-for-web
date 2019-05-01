import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {combineLatest, fromEvent, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {filter, map, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-price-view',
  templateUrl: './price-view.component.html',
  styleUrls: ['./price-view.component.css']
})
export class PriceViewComponent implements OnInit, OnDestroy  {
  public value: number = 0;
  @ViewChild('sendButton') sendButton;
  private subscriptions: Subscription[] = [];
  constructor(private store: Store<any>) { }

  ngOnInit() {
    const button$ = fromEvent(this.sendButton.nativeElement, 'click');
    const cities$ = this.store.pipe(
      map((state) => state.cityPrice),
      filter(x => x > 0));
    const coefficients$ = this.store.pipe(
      map((state) => state.coefficient),
      filter(x => x > 0)
    );

    this.subscriptions.push(
      combineLatest(cities$, coefficients$)
        .subscribe(([cityValue, coefficient]) => {
          this.value = parseInt(cityValue, 10) * parseFloat(coefficient);
        })
    );

    this.subscriptions.push(
      button$.pipe(withLatestFrom(cities$, coefficients$))
        .subscribe(([event, cityValue, coefficient]) => {
          alert('Sending value=' + cityValue + ' and coef=' + coefficient);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
