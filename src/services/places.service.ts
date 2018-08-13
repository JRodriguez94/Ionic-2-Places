import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';
import {File} from "@ionic-native/file";

import { Place } from "../classes/place";
import {ToastController} from "ionic-angular";

declare var cordova;

@Injectable()
export class PlacesService {
places: Place[] = [];

constructor(public storage: Storage,
            public file: File,
            public toastCtrl: ToastController)
{

}

  addPlace(name: string,
           images: string[],
           rating: number,
           location: {lat:number, long:number})
    {
      let place = new Place(name, images, rating, location);
      this.places.push(place);
      this.storage.set('place', this.places);
    }

  loadPlaces()
  {
    return this.places.slice();
  }

  placesInit()
  {
    return this.storage.get('place')
      .then((places: Place[]) =>{
          if(places == null){
            this.places = [];
          }
          else{
            this.places = places;
          }
          return this.places.slice();
        })
      .catch(error =>{ console.log(error)});
  }

  delete(placeid:number)
  {
    let placeTemp = this.places[placeid];
    this.places.splice(placeid, 1);
    this.storage.set('place', this.places)
                .then(() =>{
                  this.deleteImages(placeTemp);
                })
                .catch()
  }


  deleteImages(placeTemp: Place)
  {
    placeTemp.images.forEach((image) =>{
      let name = image.substring(image.lastIndexOf('/')+1);
      this.file.removeFile(cordova.file.dataDirectory, name)
        .then()
        .catch(error =>{
          let toast = this.toastCtrl.create({
            message: 'There was an error on File.removeFile',
            duration: 3000
          })
          toast.present();
          this.addPlace(placeTemp.name,
                        placeTemp.images,
                        placeTemp.rating,
                        placeTemp.lacation)
        })
    })
  }


}
