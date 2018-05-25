import {Component} from '@angular/core';
import {IonicPage, Loading, LoadingController} from 'ionic-angular';
import {PictureService} from "../../providers/picture";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {AuthService} from "../../providers/auth";

/**
 * Generated class for the PicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-picture',
    templateUrl: 'picture.html',
})
export class PicturePage {
    private loader: Loading;

    private uploadSuccess = response => {
        console.log(response);

        this.pictureService.setToUser(response.downloadURL, this.authService.getUser());
        this.loader.dismiss();
    };

    private uploadError = response => {
        console.log(response);
        this.loader.dismiss();
    };

    constructor(private authService: AuthService, private camera: Camera, private pictureService: PictureService, loaderController: LoadingController) {
        this.loader = loaderController.create({
            content: 'Please wait a second'
        });
    }

    async takePicture() {
        const options: CameraOptions = {
            quality: 50,
            targetHeight: 600,
            targetWidth: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true
        };

        let pictureBase64 = await this.camera.getPicture(options);

        this.loader.present();
        this.pictureService
            .uploadToStorage(pictureBase64)
            .then(this.uploadSuccess, this.uploadError);
    }
}
