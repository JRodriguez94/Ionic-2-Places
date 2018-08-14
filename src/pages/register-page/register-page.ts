import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from "ionic-angular";

import {User} from "../../models/user";

import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-register-page',
  templateUrl: 'register-page.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private alertCtrl: AlertController) {
  }

  async signUp(user: User)
  {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      let alert = this.alertCtrl.create({
        title: 'Awesome!!',
        message: 'Your user was created!',
        buttons: ['Ok']
      })
      alert.present();
    }
    catch (e) {
      let alert = this.alertCtrl.create({
        title: 'Something went wrong. :c',
        message: e,
        buttons: ['Ok']
      })
      alert.present();
    }
  }
}
