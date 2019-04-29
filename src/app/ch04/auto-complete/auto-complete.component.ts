import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {EMPTY, fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';

const WIKI_URL = 'https://en.wikipedia.org/w/api.php?';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  public items: string[] = [];
  public searchText: FormControl = new FormControl('');
  @ViewChild('textInput') input;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

    fromEvent(this.input.nativeElement, 'keyup').pipe(
      map(e => (e as any).target.value),
      filter( value => value.length > 2),
      debounceTime(750),
      distinctUntilChanged(),
      switchMap((value) => this.getWikiSearchResults(value))
    )

      .subscribe((response) => {
        console.log('response[1]', response[1]);
        this.items = response[1];
      });
  }


  getWikiSearchResults(value) {

    const params = new HttpParams()
      .set('action', 'opensearch')
      .set('format', 'json')
      .set('search', value);

    const searchUrl: string = WIKI_URL + params.toString();
    return this.http.jsonp(searchUrl, 'callback');
  }

  onItemClick(item) {
    this.items = [];
    this.input.nativeElement.value = item;
  }
}
