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
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AboutPage} from '../pages/about/about';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';

import {AuthService} from "../providers/auth";
import {PictureService} from '../providers/picture';
import {PicturePage} from "../pages/picture/picture";
import {Camera} from "@ionic-native/camera";
import { Geolocation } from '@ionic-native/geolocation';
import {AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';
import {MapPage} from "../pages/map/map";
import {TabsComponent} from "../components/tabs/tabs";



@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        HomePage,
        PicturePage,
        TabsPage,
        LoginPage,
        SignupPage,
        MapPage,
        TabsComponent
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
        TabsPage,
        LoginPage,
        SignupPage,
        MapPage,
        TabsComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthService,
        PictureService,
        Camera,
        Geolocation,
    ]
})
export class AppModule {
}
