import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

import {NavController, ToastController, ViewController, NavParams} from "ionic-angular";

import { Geolocation } from "@ionic-native/geolocation";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { File } from '@ionic-native/file';
import { Entry } from "@ionic-native/file";

import {PlacesService} from "../../services/places.service";


declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlace {

  ubication = {
    lat: 0,
    long: 0
  }
  ubicationReady = false;
  images: string[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              public toastCtrl: ToastController,
              private camera: Camera,
              public placesServices: PlacesService,
              public viewCtrl: ViewController,
              private file: File) {
  }

  setLocate()
  {
    this.geolocation.getCurrentPosition({timeout:10000})
                    .then((info)=>{
                        this.ubication.lat = info.coords.latitude;
                        this.ubication.long = info.coords.longitude;
                        this.ubicationReady = true;
                    })
                    .catch(error => {
                      let toast = this.toastCtrl.create({
                        message: "We had some issues trying to get you current location :c",
                        duration: 2000
                      });
                      toast.present();
                    })

  }

  takePhoto()
  {

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options)
               .then((imageData) => {

                 let path = imageData.substr(0, imageData.lastIndexOf('/')+1);
                 let name = imageData.substr(imageData.lastIndexOf('/')+1);
                 let newName = new Date().getMilliseconds() + '.jpg';
                 this.file.moveFile(path,
                                    name,
                                    cordova.file.dataDirectory,
                                    newName)
                          .then((info:Entry) =>{
                            this.images.push(info.nativeURL);
                            this.camera.cleanup();
                          })
                   .catch(error => {
                          let toast = this.toastCtrl.create({
                            message: 'There was an error on File.moVeFile',
                            duration: 3000
                          })
                          toast.present();
                          this.camera.cleanup();
                     })
      // let myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
                 let toast = this.toastCtrl.create({
                   message: 'There was an error on Camera.getPicture',
                   duration: 3000
                 })
                 toast.present();
                 this.camera.cleanup();
    });
  }

addPlace(formPlace: NgForm)
  {
    this.placesServices.addPlace(formPlace.value.namePlace,
                                this.images,
                                formPlace.value.rating,
                                this.ubication);
    formPlace.reset();
    this.ubicationReady = false;
    this.images = [];
    this.viewCtrl.dismiss();
  }


}
