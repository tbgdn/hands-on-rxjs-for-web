import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {EMPTY, fromEvent, Subscription} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {mergeMap, mergeScan} from 'rxjs/operators';

const API_URL = 'http://127.0.0.1:4001/list-data?page=';

@Component({
  selector: 'app-merge-scan-demo',
  templateUrl: './merge-scan-demo.component.html',
  styleUrls: ['./merge-scan-demo.component.css']
})
export class MergeScanDemoComponent implements OnInit, OnDestroy {
  public items: string[] = [];
  @ViewChild('loadMoreButton') loadMoreButton: ElementRef;
  private subscription: Subscription;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    fromEvent(this.loadMoreButton.nativeElement, 'click').pipe(
      mergeScan((prevResponse) => {
        if ('nextIndex' in prevResponse.response) {
          return ajax.get(API_URL + prevResponse.response.nextIndex);
        } else {
          return EMPTY;
        }
      }, {response: {nextIndex: 0}}, 1)
    ).subscribe((result: any) => {
      this.items = this.items.concat(result.response.data);
      if (!('nextIndex' in result.response)) {
        this.renderer.setAttribute(this.loadMoreButton.nativeElement, 'disabled', 'true');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
