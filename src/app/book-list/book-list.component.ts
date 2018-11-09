import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../shared/google-books.service';
import { Book } from '../shared/book.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  public searchTerm: FormControl;
  public books: Book[];
  public loading: boolean = false;
  public bookHolder: BookHolder;

  constructor(public googleBooksService: GoogleBooksService) {
    this.searchTerm = new FormControl('')
   }

  ngOnInit() {
    this.googleBooksService.searchBooks(`${this.searchTerm}`).subscribe((data) => {
      this.bookHolder = <BookHolder>data;
      this.bookHolder.items.forEach(element => {
        console.log('Title: ', element.title);
      });
      console.log('Kind => \n', this.bookHolder.kind);
      console.log('Total => \n', this.bookHolder.totalItems);
      console.log('Items => \n', this.bookHolder.items);
    }, (err) => {
      this.bookHolder.items = [];
    })
  }

}

interface BookHolder {
  totalItems: number;
  items: Array<any>;
  kind: string;
}
