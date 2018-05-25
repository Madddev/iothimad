import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';
import {firebaseConfig} from '../config';
import {NgxErrorsModule} from '@ultimate/ngxerrors';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AboutPage} from '../pages/about/about';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';

import {AuthService} from "../providers/auth";
import {PictureService} from '../providers/picture';
import {PicturePage} from "../pages/picture/picture";
import {Camera} from "@ionic-native/camera";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {NavComponent} from "../components/nav/nav";


@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        HomePage,
        PicturePage,
        LoginPage,
        SignupPage,
        NavComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig.fire),
        NgxErrorsModule,
        AngularFirestoreModule,
        AngularFireAuthModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        HomePage,
        PicturePage,
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
