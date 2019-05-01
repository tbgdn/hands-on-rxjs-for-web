import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, of, Subject, Subscription} from 'rxjs';
import {concatMap, delay, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-crud-demo',
  templateUrl: './crud-demo.component.html',
  styleUrls: ['./crud-demo.component.css']
})
export class CrudDemoComponent implements OnInit, OnDestroy {
  private items = [
    {
      id: 1,
      text: 'First Item'
    },
    {
      id: 2,
      text: 'Second Item'
    },
    {
      id: 3,
      text: 'Third Item'
    }
  ];
  private deleteSubject = new Subject();
  private deletedItems$ = this.deleteSubject.asObservable().pipe(
    concatMap(
      (id, index) => {
        if (index === 1){
          return this.deleteItem(id).pipe(delay(2000));
        } else {
          return this.deleteItem(id);
        }
      }
    )
  );
  private subscription: Subscription;
  constructor() { }

  ngOnInit() {
    this.subscription =  this.deletedItems$.subscribe(
      (response) => {
        const index = this.items.findIndex((item) => item.id === response.id);
        this.items.splice(index, 1);
      }
    );
  }

  deleteAll() {
    const ids = this.items.map(item => item.id);
    forkJoin(ids.map(this.deleteItem)).subscribe(responses => {
      responses.forEach(response => {
        console.log(`Deleted: ${response.id}`);
        const index = this.items.findIndex(item => item.id === response.id);
        this.items.splice(index, 1);
      });
    });
  }

  deleteItem(id) {
    return of({ id, success: true}).pipe(delay(2000));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
