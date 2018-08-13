import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";

import {User} from "../../models/user";

import { RegisterPage } from "../register-page/register-page";
import {HomePage} from "../home/home";

import {AngularFireAuth} from "angularfire2/auth";



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
              private afAuth: AngularFireAuth) {
  }

  async logIn(user: User)
  {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result){
        this.navCtrl.setRoot(this.homepage)
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  signUp()
  {
    this.navCtrl.push(this.registerpage);
  }

}
