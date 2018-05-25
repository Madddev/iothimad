import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {LoginPage} from '../pages/login/login';
import {TabsPage} from '../pages/tabs/tabs';

import {AuthService} from "../providers/auth";
import {HomePage} from "../pages/home/home";
import {PicturePage} from "../pages/picture/picture";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    public rootPage: any = TabsPage;
    private menu: MenuController;

    constructor(public platform: Platform, menu: MenuController, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthService) {
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
                        this.rootPage = TabsPage;
                    } else {
                        this.rootPage = PicturePage;
                    }
                },
                () => {
                    this.rootPage = PicturePage;
                }
            );
    }

    login() {
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
