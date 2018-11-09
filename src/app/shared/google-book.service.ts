import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { BookFactory } from './book.factory';

@Injectable({
  providedIn: 'root'
})
export class GoogleBookService {

  private apiUrl: string = 'https://www.googleapis.com/books/v1/volumes';
  public loading: boolean = false;
  public initialised: boolean = false;
  public totalItems: number = 0;
  public page: number = 1;
  public pageSize: number = 10;
  public query: string = "";
  public books: Book[];

  constructor(private http: HttpClient) { }

  get startIndex() {
    return this.page * this.pageSize;
  }

  getBooks() {
    return this.http.get(`this.apiUrl?q=${this.query}&maxResults=${this.pageSize}&startIndex=${this.startIndex}`);
  }

  private bookFactory(item: any): Book {
    return new BookFactory(
      item.id,
      item.volumeInfo.title,
      item.volumeInfo.subtitle,
      item.volumeInfo.authors,
      item.volumeInfo.publisher,
      item.volumeInfo.publishedDate,
      item.volumeInfo.description,
      item.volumeInfo.categories ? item.volumeInfo.categories.map((item) => item.split("/").pop().trim()) : ['N/A'],
      item.volumeInfo.imageLinks.thumbnail,
      item.volumeInfo.imageLinks.smallThumbnail
    )
  }
}
