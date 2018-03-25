import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class BibleService {

    public verses: Observable<Verse[]>;
    public books: Observable<Book[]>;

    constructor(public http: Http) {

        this.verses = this.http.get('assets/json/t_kjv.json')
            .map(response => {
                return <Verse[]>response.json();
            });

        this.books = this.http.get('assets/json/books.json')
            .map(response => {
                return <Book[]>response.json();
            });
    }

    public getRandomChapter() {

        return this.books.map(bookResults => {

            const randomBookNumber = Math.floor(Math.random() * Math.floor(bookResults.length));
            
            const randomBook = bookResults.filter(function(value: Book){
                return value.bookNumber === randomBookNumber.toString();
            })[0];
    
            const randomChapterNumber = Math.floor(Math.random() * Math.floor(parseInt(randomBook.length)));
    
            return this.verses.map(versesResults => {
                return versesResults.filter(function(value: Verse){
                    return value.field[1] === randomBook.bookNumber 
                        && value.field[2] === randomChapterNumber.toString();
                });
    
            });
        });

    }

    public getRandomVerse() {

        return this.getRandomChapter().map(chapterResults => {

            return chapterResults.map(verseResults => {

                const randomVerseNumber = Math.floor(Math.random() * Math.floor(verseResults.length));
        
                return verseResults.filter(function(value){
                    return value.field[3] === randomVerseNumber.toString();
                })[0];
            });

        });

    }

    public getChapter(book: number, chapter: number) {

        return this.verses.map(versesResults => {
            return versesResults.filter(function(value: Verse){
                return value.field[1] === book.toString()
                    && value.field[2] === chapter.toString();
            });

        });
    }
}

export interface Verse {
    field: Array<any>;
}

export interface Book {
    name: string,
    bookNumber: string,
    length: string
}

export class BookImpl implements Book {
    name: string = '';
    bookNumber: string = '';
    length: string = '';
}

export class VerseImpl implements Verse {
    field: Array<any>;
    constructor(){
        this.field = ['0','0','0','0',''];
    }
}
  