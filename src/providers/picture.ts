import {Injectable} from '@angular/core';
import {default as firebase, storage} from "firebase";
import {AngularFirestore} from "angularfire2/firestore";

@Injectable()
export class PictureService {
    constructor(private db: AngularFirestore) {
        //
    }

    private static randomId() {
        return Math.random().toString(32).substring(2);
    }

    uploadToStorage(pictureBase64: string) {
        return storage()
            .ref('pictures')
            .child(PictureService.randomId() + '.jpg')
            .putString('data:image/jpg;base64,' + pictureBase64, 'data_url');
    }

    setToUser(imagePath: string, user: firebase.User) {
        return this.db.collection('pictures').add({
            user_id: user.uid,
            path: imagePath,
            location: {
                longitude: 0,
                latitude: 0
            },
            date: Date.now()
        });
    }
}
