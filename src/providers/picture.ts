import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { AngularFirestore } from "angularfire2/firestore";
import { storage } from "firebase";
import { Observable } from "rxjs/Observable";

interface Items {}

@Injectable()
export class PictureService {
  items: Observable<Items[]>;
  itemsCollection: AngularFirestoreCollection<Items>;
  requettesProvider: any = [];

  constructor(public db: AngularFirestore) {}
  private static randomId() {
    return Math.random().toString(32);
  }

  add(pictureBase64: string) {
    return storage()
      .ref("pictures")
      .child(PictureService.randomId() + ".jpg")
      .putString("data:image/jpg;base64," + pictureBase64, "data_url");
  }

  addGeoloclisation(latitude, longitude, imagePath, userId) {
    this.db
      .collection("users_pictures_geoloc")
      .add({
        userId: userId,
        imagePath: imagePath,
        latitude: latitude,
        longitude: longitude
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  }
}
