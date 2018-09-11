import {Component, ViewChild } from '@angular/core';
import {Platform, NavController, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {LogInPage} from "../pages/log-in-page/log-in-page";

import {AngularFireAuth} from "angularfire2/auth";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  rootPage:any = LogInPage;

  homePage = HomePage;
  loginPage = LogInPage;
  @ViewChild('content') content: NavController;
  userIsConnected = false;


  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public menuCtrl: MenuController,
              public afAuth: AngularFireAuth,
              public authservice: AuthenticationService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    // firebase.initializeApp({
    //   apiKey: "AIzaSyAdbxsMEogmgzSy1qw29IwWaGnLPCzUCXQ",
    //   authDomain: "placesionic2-1533748212129.firebaseapp.com",
    // });
    this.afAuth.auth.onAuthStateChanged(
      user => {
        if(user != null){
          this.userIsConnected = true;
          this.content.setRoot(this.homePage);
        }
        else{
          this.userIsConnected = false;
          this.content.setRoot(this.loginPage);
        }
      }
    )
  }

  navigationPage(page)
  {
    this.content.setRoot(page);
    this.menuCtrl.close();
  }

  navigationlogOut()
  {
    this.authservice.endSession();
    this.menuCtrl.close();
  }
}

