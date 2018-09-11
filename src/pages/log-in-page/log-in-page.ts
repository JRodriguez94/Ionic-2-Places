import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { AlertController } from "ionic-angular";

import {User} from "../../models/user";

import { RegisterPage } from "../register-page/register-page";
import {HomePage} from "../home/home";

import {AngularFireAuth} from "angularfire2/auth";
import {NgForm} from "@angular/forms";

import {AuthenticationService} from "../../services/authentication.service";


/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-log-in-page',
  templateUrl: 'log-in-page.html',
})
export class LogInPage {

  user = {} as User;

  registerpage = RegisterPage;
  homepage = HomePage;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              public authservise: AuthenticationService) {
  }

  // async logIn(user: User)
  async logIn(formLogIn: NgForm)
  {
    this.authservise.logIn(formLogIn.value.email, formLogIn.value.password)
      .then(info => console.log('LogIn successful'))
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: 'There was a problem :c',
          message: error,
          buttons: ['Ok :c']
        })
        alert.present();
      })


    // try {
    //   const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    //   if(result){
    //     this.navCtrl.setRoot(this.homepage)
    //   }
    // }
    // catch (e) {
    //   let alert = this.alertCtrl.create({
    //     title: 'Something went wrong. :c',
    //     message: 'There was a mistake while we tried to validate your login information' + e
    //   })
    //   alert.present();
    // }
  }

  signUp()
  {
    this.navCtrl.push(this.registerpage);
  }

}
