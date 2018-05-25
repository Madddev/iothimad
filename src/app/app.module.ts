import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {firebaseConfig} from '../config';
import {NgxErrorsModule} from '@ultimate/ngxerrors';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AboutPage} from '../pages/about/about';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';

import {AuthService} from "../providers/auth";
import {PictureService} from '../providers/picture';
import {PicturePage} from "../pages/picture/picture";
import {Camera} from "@ionic-native/camera";


@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        HomePage,
        PicturePage,
        TabsPage,
        LoginPage,
        SignupPage

    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig.fire),
        NgxErrorsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        HomePage,
        PicturePage,
        TabsPage,
        LoginPage,
        SignupPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AngularFireAuth,
        AuthService,
        PictureService,
        Camera
    ]
})
export class AppModule {
}
