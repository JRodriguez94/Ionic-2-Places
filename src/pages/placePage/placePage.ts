import { Component } from '@angular/core';

import {NavController, NavParams, ViewController} from "ionic-angular";

import { SocialSharing } from '@ionic-native/social-sharing';

import {PlacesService} from "../../services/places.service";
import {Place} from "../../classes/place";

@Component({
  selector: 'page-place',
  templateUrl: 'placePage.html',
})
export class PlacePage {

  place: Place;
  placeid: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public socialsharing: SocialSharing,
              public placeservice: PlacesService) {
    this.place = navParams.get('place');
    this.placeid = this.navParams.get('placeid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
  }

  closePlace()
  {
    this.viewCtrl.dismiss();
  }

  deletePlace()
  {
      this.placeservice.delete(this.placeid);
      this.closePlace();
  }

  sendPlace()
  {
    let message = this.place.name;
    let url = "http://www.google.com/maps/@"
             + this.place.lacation.lat + ","
             + this.place.lacation.long + ",9z?hl=es";
    this.socialsharing.shareViaWhatsApp(message,
                                        this.place.images[0],
                                        url);
  }

}
