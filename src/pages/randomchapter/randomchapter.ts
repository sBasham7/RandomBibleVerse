import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BibleService, Book, BookImpl, Verse, VerseImpl } from '../../app/BibleService';

/**
 * Generated class for the RandomchapterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-randomchapter',
  templateUrl: 'randomchapter.html',
})
export class RandomchapterPage {

  public book: Book;
  public verses: Verse[];

  constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      public bibleService: BibleService) {

    this.book = new BookImpl();
    this.verses = new Array<VerseImpl>();
    this.verses.push(new VerseImpl);
  }

  load() {

    var pageReference = this;

    pageReference.bibleService.getRandomChapter().subscribe(results => {
      results.subscribe(verses => {
        pageReference.verses = verses;

        pageReference.bibleService.books.subscribe(bookResults => {
          pageReference.book = bookResults.filter(function(entry) {
            return entry.bookNumber == pageReference.verses[0].field[1];
          })[0];
        });
      });
    });

  }

  ionViewDidLoad() {
    
    this.load();
  }

}
