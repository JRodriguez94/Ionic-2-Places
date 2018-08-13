import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { NavParams } from "ionic-angular";

import { NgForm } from "@angular/forms";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }

  logIn(formLogIn: NgForm)
  {

  }

  signUp(formLogIn: NgForm)
  {

  }

}
