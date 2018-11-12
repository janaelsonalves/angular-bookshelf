import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, startWith, catchError, map } from 'rxjs/operators';
import { empty, Observable, of } from 'rxjs';

import { GoogleBooksService } from '../shared/google-books.service';
import { Book } from '../shared/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  public searchTerm: FormControl;
  public books: Book[];

  public loading: boolean;
  public bookHolder: BookHolder;

  constructor(public googleBooksService: GoogleBooksService) {
    this.searchTerm = new FormControl('')
  }

  ngOnInit() {

  }

  searchBooks() {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => (query && query != '') ? this.googleBooksService.searchBooks(query) : of({}))
      )
      .subscribe((data: BookHolder) => {
        this.bookHolder = data
      }, (err) => {
        console.log('Errors: ', err);
      })
  }

  public onClick(event: Event) {
    event.stopPropagation();
    console.log('Search Value: ', this.searchTerm);
    this.searchBooks();
    console.log('Call Search Value: ', this.searchTerm);
  }

  onKeyup(event: any) {
    console.log("Key Value: ", event.target.value);
    this.searchBooks();
    console.log("Call Key Value: ", event.target.value);
  }

}

interface BookHolder {
  items: Array<any>;
  kind?: string;
  totalItems?: number;
}