import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

import { usercreds } from '../../models/interfaces/usercreds';

import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;
  constructor(public navCtrl: NavController,public navParams: NavParams, public authservice: AuthProvider, public loadingCtrl: LoadingController,private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  

  

  signin() {
   let loader = this.loadingCtrl.create({
        content: 'Please wait'
      });
      loader.present();
    this.authservice.login(this.credentials).then((res: any) => {
    loader.dismiss();
      if (!res.code){
        this.navCtrl.setRoot('TabsPage');
        


  
  
}
        
      else
        alert(res);
    })
    this.afAuth.authState.subscribe(auth => {
if(auth)
this.navCtrl.setRoot('TabsPage'); 
});
  }

  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }
   
  signup() {
    this.navCtrl.push('SignupPage');
  }

}
