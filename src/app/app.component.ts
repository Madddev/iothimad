import {Component, ViewChild} from '@angular/core';
import {App, MenuController, Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';


import { TabsPage } from '../pages/tabs/tabs';
import {AuthService} from "../services/auth.service";
import {HomePage} from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;
  pages;
  private  menu : MenuController

  constructor(public platform: Platform,menu : MenuController,public statusBar: StatusBar, public splashScreen: SplashScreen, private auth : AuthService) {
    this.menu = menu;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });

    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = HomePage;
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );
  }
  login(){
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(LoginPage)
  }
  logout() {
    this.menu.close();
    this.auth.signOut();
    this.nav.setRoot(HomePage);
  }


}
