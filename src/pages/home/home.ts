import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery';
import { BibleService, Book, Verse } from '../../app/BibleService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public selectedBook: Book;
  public selectedChapter: number;
  public verses: Verse[];
  public books: Book[];
  public chapters: number[];

  constructor(public navCtrl: NavController, 
    public bibleService: BibleService,
    private elementRef: ElementRef) {

      this.chapters = [];

      this.bibleService.books.subscribe(results => {
        this.books = results;
        this.selectedBook = this.books[0];
        this.selectedChapter = 1;

        this.chapters.slice(0);
        
        for (let index = 1; index <= parseInt(this.selectedBook.length); index++) {
          this.chapters.push(index);
        }
        
        this.onChapterChange();

      });

  }

  onBookChange(){
    
    this.chapters.slice(0);

    for (let index = 1; index <= parseInt(this.selectedBook.length); index++) {
      this.chapters.push(index);
    }

    this.selectedChapter = 1;

    //NOTE: odd bug as of this writing, the selected value appears to just append to the select-text element
    $(this.elementRef.nativeElement).find('#chapterIonSelect').find('.select-text').html(this.selectedChapter);
    
    this.onChapterChange();
  }

  onChapterChange(){

    this.bibleService.getChapter(parseInt(this.selectedBook.bookNumber), this.selectedChapter).subscribe(results => {
      this.verses = results;
    });

  }

}