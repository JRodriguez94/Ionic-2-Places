import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";

import { AgmCoreModule } from '@agm/core';
import { Ionic2RatingModule } from 'ionic2-rating';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPlace } from "../pages/add-place/add-place";
import { PlacePage } from "../pages/placePage/placePage";

import { LogInPage } from "../pages/log-in-page/log-in-page";
import { RegisterPage } from "../pages/register-page/register-page";

import {PlacesService} from "../services/places.service";
import { SocialSharing } from '@ionic-native/social-sharing';
import { AuthenticationService } from "../services/authentication.service";

import {AngularFireModule} from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import {FIREBASE_CONFIG} from "./app.firebase.config";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPlace,
    PlacePage,
    LogInPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDvyMriRPJHduX3etCFdonphI4WDhCHs90'
    }),
    Ionic2RatingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlace,
    PlacePage,
    LogInPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation, Camera, PlacesService, SocialSharing, File, AuthenticationService
  ]
})
export class AppModule {}
