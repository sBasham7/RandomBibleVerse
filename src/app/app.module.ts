import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { BibleService } from './BibleService';
import { HomePage } from '../pages/home/home';
import { RandomchapterPage } from '../pages/randomchapter/randomchapter';
import { RandomversePage } from '../pages/randomverse/randomverse';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RandomchapterPage,
    RandomversePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RandomchapterPage,
    RandomversePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BibleService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
