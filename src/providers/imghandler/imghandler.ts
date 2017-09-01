import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import firebase from 'firebase';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class ImghandlerProvider {

  nativepath: any;
  firestore = firebase.storage();

  constructor(public filechooser: FileChooser,public alertCtrl: AlertController,private camera: Camera,public loadingCtrl: LoadingController) {
  }

  
 
 
    uploadimage() {
   let loader = this.loadingCtrl.create({
content: 'Please wait'
});
const options: CameraOptions = {
quality: 100,
destinationType: this.camera.DestinationType.DATA_URL,
encodingType: this.camera.EncodingType.JPEG,
mediaType: this.camera.MediaType.PICTURE,
sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
}
var promise = new Promise((resolve, reject) => {
//alert("1");

this.camera.getPicture(options).then((imageData) => {
loader.present();
var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
imageStore.putString(imageData, 'base64').then((res) => {
this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
loader.dismiss()
resolve(url);
}).catch((err) => {
reject(err);
})
}).catch((err) => {
reject(err);
})

}, (err) => {
}).catch((err) => {
reject(err);
});
loader.dismiss();
})
return promise;
}
  

  picmsgstore(){
   let loader = this.loadingCtrl.create({
content: 'Please wait'
});
const options: CameraOptions = {
quality: 100,
destinationType: this.camera.DestinationType.DATA_URL,
encodingType: this.camera.EncodingType.JPEG,
mediaType: this.camera.MediaType.PICTURE,
sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
}
var promise = new Promise((resolve, reject) => {
//alert("1");

this.camera.getPicture(options).then((imageData) => {
loader.present();
var imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
imageStore.putString(imageData, 'base64').then((res) => {
this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
loader.dismiss()
resolve(url);
}).catch((err) => {
reject(err);
})
}).catch((err) => {
reject(err);
})

}, (err) => {
}).catch((err) => {
reject(err);
});
loader.dismiss();
})
return promise;
}
  




  guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

}
