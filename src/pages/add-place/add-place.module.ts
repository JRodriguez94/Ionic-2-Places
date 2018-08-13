import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPlace } from './add-place';

@NgModule({
  declarations: [
    AddPlace,
  ],
  imports: [
    IonicPageModule.forChild(AddPlace),
  ],
})
export class AddPlaceModule {}
