import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { BookFactory } from './book.factory';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  private apiUrl: string = 'https://www.googleapis.com/books/v1/volumes';
  public loading: boolean = false;
  public initialised: boolean = false;
  public totalItems: number = 0;
  public _page: number = 1;
  public pageSize: number = 10;
  public query: string = "";
  public books: Book[];

  constructor(private http: HttpClient) { }

  public searchBooks(query: string, maxResults: number = 10, startIndex: number = 1) {
    return this.http.get(`${this.apiUrl}?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`);
    //return this.http.get('https://www.googleapis.com/books/v1/volumes/?q=angualar');
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
