import { Component , NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { ChatProvider } from '../../providers/chat/chat';
import firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';



/**
 * Generated class for the ChatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myrequests;
  myfriends;
  firestore = firebase.storage();
  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,
              public events: Events,public userservice: UserProvider,public zone: NgZone,  public alertCtrl: AlertController, public chatservice: ChatProvider) {
  }


  ionViewWillEnter() {
    this.requestservice.getmyrequests();
   
   
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
    
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }


  addbuddy() {
    this.navCtrl.push('BuddiesPage');
  }

  accept(item) {
    this.requestservice.acceptrequest(item).then(() => {
      
      let newalert = this.alertCtrl.create({
        title: 'Friend added',
        subTitle: 'Go to your profile and tap on the friend to chat with him',
        buttons: ['Okay']
      });
      newalert.present();
    })
  }

  ignore(item) {
    this.requestservice.deleterequest(item).then(() => {

    }).catch((err) => {
      alert(err);
    })
  }
logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.parent.parent.setRoot('LoginPage');
    })
  }
 
}
