import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
    private user: firebase.User;

    constructor(public afAuth: AngularFireAuth) {
        afAuth.authState.subscribe(user => {
            this.user = user;
        });
    }

    get authenticated(): boolean {
        return this.user !== null;
    }

    signInWithEmail(credentials) {
        return this.afAuth.auth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        );
    }

    signInWithGoogle() {
        return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
    }

    signUp(credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
        );
    }

    signOut(): Promise<void> {
        return this.afAuth.auth.signOut();
    }

    getEmail() {
        return this.user && this.user.email;
    }

    getUser() {
        return this.user;
    }

    private oauthSignIn(provider: AuthProvider) {
        if (!(<any>window).cordova) {
            return this.afAuth.auth.signInWithPopup(provider);
        } else {
            return this.afAuth.auth.signInWithRedirect(provider).then(() => {
                return this.afAuth.auth
                    .getRedirectResult()
                    .then(result => {
                        let token = result.credential.accessToken;
                        let user = result.user;
                    })
                    .catch(function(error) {
                        alert(error.message);
                    });
            });
        }
    }
}
