import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {HomePage} from '../home/home';
import {PicturePage} from "../picture/picture";
import {MapPage} from "../map/map";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    public tabs: Array<object>;

    constructor() {
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
            },
            {
                page: MapPage,
                title: 'Map',
                icon: 'map'
            }
        ]
    }
}
