import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';


import { TabsPage } from '../pages/tabs/tabs';
import {AuthService} from "../services/auth.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(public platform: Platform,public statusBar: StatusBar, public splashScreen: SplashScreen, private auth : AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      statusBar.styleDefault();
      splashScreen.hide();
      // Here you can do any higher level native things you might need.
      this.initializeApp();
    });
  }

  initializeApp(){
    this.rootPage = LoginPage;
  }
}
