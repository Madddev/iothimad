import { Component } from "@angular/core";
import { HomePage } from "../../pages/home/home";
import { PicturePage } from "../../pages/picture/picture";
import { AboutPage } from "../../pages/about/about";
import { MapPage } from "../../pages/map/map";

/**
 * Generated class for the TabsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "tabs",
  templateUrl: "tabs.html"
})
export class TabsComponent {
  public tabs: Array<object>;

  constructor() {
    this.tabs = [
      {
        page: MapPage,
        title: "Map",
        icon: "map"
      },
      {
        page: PicturePage,
        title: "Picture",
        icon: "camera"
      },
      {
        page: AboutPage,
        title: "About",
        icon: "information-circle"
      }
    ];
  }
}
