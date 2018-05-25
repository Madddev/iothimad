import {Component} from '@angular/core';
import {AboutPage} from "../../pages/about/about";
import {PicturePage} from "../../pages/picture/picture";
import {HomePage} from "../../pages/home/home";
import {AuthService} from "../../providers/auth";

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.html'
})
export class NavComponent {

    public tabs: Array<object>;

    constructor(public auth: AuthService) {
        this.tabs = [
            {
                page: HomePage,
                title: 'Home',
                icon: 'home'
            },
            {
                page: PicturePage,
                title: 'Picture',
                icon: 'camera'
            },
            {
                page: AboutPage,
                title: 'About',
                icon: 'information-circle'
            }
        ]
    }
}
