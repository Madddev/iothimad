import {Injectable} from '@angular/core';
import {storage} from "firebase";

@Injectable()
export class PictureService {
    private static randomId() {
        return Math.random().toString(32);
    }

    add(pictureBase64: string) {
        return storage()
            .ref('pictures')
            .child(PictureService.randomId() + '.jpg')
            .putString('data:image/jpg;base64,' + pictureBase64, 'data_url');
    }
}
