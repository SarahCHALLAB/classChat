import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import { MyApp } from './app.component';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { RequestsProvider } from '../providers/requests/requests';
import { ChatProvider } from '../providers/chat/chat';

import { Camera, CameraOptions } from '@ionic-native/camera';



var config = {
    apiKey: "AIzaSyCORz79EK7RmR6Q8qW6YpmGy8sUrvm1VRE",
    authDomain: "chat-37840.firebaseapp.com",
    databaseURL: "https://chat-37840.firebaseio.com",
    projectId: "chat-37840",
    storageBucket: "chat-37840.appspot.com",
    messagingSenderId: "1057804491579"
  };

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '71e98f07'
  }
};



@NgModule({
  declarations: [
    MyApp
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
     CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(config),
     AngularFireDatabaseModule
     

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FilePath,
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    AuthProvider,
    UserProvider,
    ImghandlerProvider,
    RequestsProvider,
    ChatProvider,
    Camera
  ]
})
export class AppModule {}
