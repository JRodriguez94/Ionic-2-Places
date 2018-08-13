import {Component, OnInit} from '@angular/core';
import { ModalController, NavController} from 'ionic-angular';

import {AddPlace} from "../add-place/add-place";
import { Place } from "../../classes/place";
import {PlacesService} from "../../services/places.service";
import { PlacePage } from "../placePage/placePage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  addPlaces = AddPlace;
  places:Place[] = [];

  constructor(public navCtrl: NavController,
              public placesService: PlacesService,
              public modalCtrl: ModalController) {

  }

  ngOnInit()
  {
    this.placesService.placesInit()
      .then((places: Place[]) => {
        this.places = places;
      })
      .catch(error => { console.log(error) });
  }

  ionViewWillEnter()
  {
    this.places = this.placesService.loadPlaces();
  }

  goAddPlaces()
  {
    this.navCtrl.push(this.addPlaces);
  }

  placeDetails(place: Place, placeId: number)
  {
    let modal = this.modalCtrl
                    .create(PlacePage, {place: place,
                                             placeid: placeId});
    modal.present();
    modal.onDidDismiss(() =>{
      this.places = this.placesService.loadPlaces();
    });
  }
}
