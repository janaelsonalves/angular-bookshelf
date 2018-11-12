import { Book } from "./book.model";

export class BookFactory implements Book {

    constructor(public id: string,
        public title: string,
        public subTitle: string,
        public authors: string[],
        public publisher: string,
        public publishDate: string,
        public description: string,
        public categories: string[],
        public thumbnail: string,
        public smallThumbnail: string) { }

    public create(item: any): Book {
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