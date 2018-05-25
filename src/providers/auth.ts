import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from "firebase";
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
    private user?: firebase.User = null;

    constructor(public afAuth: AngularFireAuth) {
        afAuth.authState.subscribe(user => {
            this.user = user;
        });
    }

    get authenticated(): boolean {
        return this.user !== null;
    }

    signInWithEmail(credentials) {
        console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    signInWithGoogle() {
        console.log('Sign in with google');
        return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
    }

    signUp(credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
        );
    }

    getUser() {
        return this.user;
    }

    signOut(): Promise<void> {
        return this.afAuth.auth.signOut();
    }

    getEmail() {
        return this.user.email;
    }

    private oauthSignIn(provider: AuthProvider) {
        if (!(<any>window).cordova) {
            return this.afAuth.auth.signInWithPopup(provider);
        } else {
            return this.afAuth.auth.signInWithRedirect(provider)
                .then(() => {
                    return this.afAuth.auth.getRedirectResult().then(result => {
                        // This gives you a Google Access Token.
                        // You can use it to access the Google API.
                        let token = result.credential.accessToken;
                        // The signed-in user info.
                        let user = result.user;
                        console.log(token, user);
                    }).catch(function (error) {
                        // Handle Errors here.
                        alert(error.message);
                    });
                });
        }
    }


}
