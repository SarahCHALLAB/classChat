import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController,Events } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import { RequestsProvider } from '../../providers/requests/requests';
import { ChatProvider } from '../../providers/chat/chat';
import firebase from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatar: string;
  displayName: string;
  firestore = firebase.storage();
   myrequests;
  myfriends;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice: UserProvider, public zone: NgZone, public alertCtrl: AlertController,
    public imghandler: ImghandlerProvider,private camera: Camera,public loadingCtrl: LoadingController,public requestservice: RequestsProvider,public events: Events, public chatservice: ChatProvider) {
  }

  ionViewWillEnter() {
    this.loaduserdetails();
     this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.myfriends = [];
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends; 
    })
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
      this.myfriends = [];
      this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends; 
    })
    })
  }
editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imghandler.uploadimage().then((url: any) => {
      this.userservice.updateimage(url).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your profile pic has been changed successfully!!');
          statusalert.present();
          this.zone.run(() => {
          this.avatar = url;
        })  
        }  
      }).catch((err) => {
          statusalert.setTitle('Failed');
          statusalert.setSubTitle('Your profile pic was not changed');
          statusalert.present();
      })
      })
  }
  
  editname() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    let alert = this.alertCtrl.create({
      title: 'Edit Username',
      inputs: [{
        name: 'nickname',
        placeholder: 'username'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'Edit',
        handler: data => {
          if (data.nickname) {
            this.userservice.updatedisplayname(data.nickname).then((res: any) => {
              if (res.success) {
                statusalert.setTitle('Updated');
                statusalert.setSubTitle('Your nickname has been changed successfully!!');
                statusalert.present();
                this.zone.run(() => {
                  this.displayName = data.nickname;
                })
              }

              else {
                statusalert.setTitle('Failed');
                statusalert.setSubTitle('Your nickname was not changed');
                statusalert.present();
              }
                             
            })
          }
        }
        
      }]
    });
    alert.present();
  }

 
 

buddychat(buddy) {
    this.chatservice.initializebuddy(buddy);
    this.navCtrl.push('BuddychatPage');
  }


}