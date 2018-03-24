import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BibleService, Book, BookImpl, Verse, VerseImpl } from '../../app/BibleService';

/**
 * Generated class for the RandomversePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-randomverse',
  templateUrl: 'randomverse.html',
})
export class RandomversePage {

  public book: Book;
  public verse: Verse;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      public bibleService: BibleService) {

    this.book = new BookImpl();
    this.verse = new VerseImpl();
  }

  ionViewDidLoad() {

    var pageReference = this;
    
    this.bibleService.getRandomVerse().subscribe(verseResult => {
      verseResult.subscribe(verse => {
        pageReference.verse = verse;

        console.log(verse);
        pageReference.bibleService.books.subscribe(bookResult => {
          pageReference.book = bookResult.filter(function(entry){
            return entry.bookNumber == pageReference.verse.field[1];
          })[0];
        });

      });
    });
  }

}
