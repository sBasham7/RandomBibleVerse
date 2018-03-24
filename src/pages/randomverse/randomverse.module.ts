import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RandomversePage } from './randomverse';

@NgModule({
  declarations: [
    RandomversePage,
  ],
  imports: [
    IonicPageModule.forChild(RandomversePage),
  ],
})
export class RandomversePageModule {}
