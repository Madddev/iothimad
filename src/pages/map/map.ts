import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PictureService} from "../../providers/picture";
import {AuthService} from "../../providers/auth";

declare var google;

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 /**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface Items {
}

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  itemsCollection: AngularFirestoreCollection<Items>;
  items: Observable<Items[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private authService: AuthService,public geolocation: Geolocation, db: AngularFirestore, public serviceDeRequette: PictureService) {
    this.itemsCollection = db.collection<Items>('users_pictures_geoloc');
    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Items;
        const id = a.payload.doc.id;

        return {id, ...data};
      })
    })
  }

  ionViewDidLoad() {
    this.carte();
  }

  carte() {
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


      this.items.forEach((item) => {
        this.addMarker(item[0]);
      });
    }, (err) => {
      console.log(err);
    });
  }

  addMarker(item) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {
        lat: item.latitude,
        lng: item.longitude
      }
    });
    let content = `
      <h4>image de ${item.userId}</h4>
      <div style="text-align: center"><img style="width: 100px;height: 100px" src="${item.imagePath}"></div>
    `;
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  /* const subscription = this.geolocation.watchPosition()
  .filter((p) => p.coords !== undefined) //Filter Out Errors
  .subscribe(position => {
  console.log(position.coords.longitude + ' ' + position.coords.latitude);
  });*/
// To stop notifications
}
