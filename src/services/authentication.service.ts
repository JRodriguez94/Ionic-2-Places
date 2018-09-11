
import { AngularFireAuth } from "angularfire2/auth";
import {AlertController} from "ionic-angular";
import {Injectable} from "@angular/core";


@Injectable()
export class AuthenticationService{

   constructor(private afAuth: AngularFireAuth,
               private alertCtrl: AlertController) {}


  async registUser(email:string, password:string)
  {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
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

  logIn(email:string, password:string)
  {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  endSession()
  {
    this.afAuth.auth.signOut();
  }

  // 7777777777777777777777777777777777777777777777777777777

 // registUser(email:string, password:string)
 //  {
 //    console.log("Este es el primer parametro: " + email);
 //    console.log("Este es el segundo parametro: " + password);

    // // return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    // try {
    //   // const result = this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    //   const result = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    //   console.log(result);
    //   let alert = this.alertCtrl.create({
    //     title: 'Awesome!!',
    //     message: 'Your user was created!',
    //     buttons: ['Ok']
    //   })
    //   alert.present();
    // }
    // catch (e) {
    //   let alert = this.alertCtrl.create({
    //     title: 'Something went wrong. :c',
    //     message: e,
    //     buttons: ['Ok']
    //   })
    //   alert.present();
    // }
  // }

}


