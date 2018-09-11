import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from "ionic-angular";

import {User} from "../../models/user";

import {AngularFireAuth} from "angularfire2/auth";
import {AuthenticationService} from "../../services/authentication.service";
import {NgForm} from "@angular/forms";

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
  // authenticationservice = AuthenticationService;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private alertCtrl: AlertController,
              public authservice: AuthenticationService) {
  }

   regist(formRegist: NgForm)
  {

    this.authservice.registUser(formRegist.value.email,
                                formRegist.value.password);

  }


  // async signUp(formRegist: NgForm)
  // {
  //   try {
  //     const result = await this.afAuth.auth.createUserWithEmailAndPassword(formRegist.value.email, formRegist.value.password);
  //     console.log(result);
  //     let alert = this.alertCtrl.create({
  //       title: 'Awesome!!',
  //       message: 'Your user was created!',
  //       buttons: ['Ok']
  //     })
  //     alert.present();
  //   }
  //   catch (e) {
  //     let alert = this.alertCtrl.create({
  //       title: 'Something went wrong. :c',
  //       message: e,
  //       buttons: ['Ok']
  //     })
  //     alert.present();
  //   }
  // }

}
