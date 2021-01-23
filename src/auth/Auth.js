import firebase from "firebase/app";
import "firebase/auth";
import jwtDecode from "jwt-decode";
import userUtil from "../helper/StoreUsers";

export default class Auth {
  constructor(history) {
    this.history = history;
    //const auth0;
    if (!firebase.apps.length) {
      this.auth0 = firebase
        .initializeApp({
          apiKey: "AIzaSyAB2CTBG_HIdM254a785sbr1voYTBHOJuE",
          authDomain: "buyfreshbro.firebaseapp.com",
          projectId: "buyfreshbro",
          storageBucket: "buyfreshbro.appspot.com",
          messagingSenderId: "732112326325",
          appId: "1:732112326325:web:9d8ff946adf7465fbf78fc",
        })
        .auth();
    } else {
      this.auth0 = firebase.app().auth();
    }
    // this.auth = firebase.auth();
  }

  signInWithGoogle = (googlprovider) => {
    if (!this.auth0) return;
    this.auth0
      .signInWithPopup(googlprovider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log("errr ", error);
        // ...
      });
  };
  signInWithPhone = (phoneNumber, appVerifire, callback) => {
    if (!this.auth0) return;

    this.auth0
      .signInWithPhoneNumber(phoneNumber, appVerifire)
      .then(function (confirmationResult) {
        console.log("OTP successfully send");
        window.confirmationResult = confirmationResult;
        callback(true);
      })
      .catch(function (error) {
        console.log("sms not sent", error);
        callback(false);
      });
  };
  varifyOTP = async (otp, callback) => {
    window.confirmationResult
      .confirm(otp)
      .then(async function (result) {
        console.log(" User signed in successfully.");
        const user = result.user;
        let data = {};
        user.getIdToken().then((token) => {
          // sessionStorage.setItem("accessToken", token);
        });
        sessionStorage.setItem("phoneNumber", user.phoneNumber);
        sessionStorage.setItem("uid", user.uid);

        data.phoneNumber = user.phoneNumber;
        data.photoURL = user.photoURL;
        data.uid = user.uid;
        data.addresses = [];
        data.orders = [];
        data.first = "";
        data.last = "";
        data.email = "";

        await userUtil
          .StoreUsers(data, (v) => console.log(v))
          .then((r) => {
            callback(true);
          });
      })
      .catch((err) => {
        console.log("-----------", err);
        sessionStorage.setItem("userString", null);
        callback(false);
      });
    // const credential = firebase.auth.PhoneAuthProvider.credential(
    //   window.confirmationResult.verificationId,
    //   otp
    // );
    // callback(true);
  };

  updateProfile = async (data, callback) => {
    if (!this.auth0) return;
    await this.auth0.currentUser
      .updateProfile(data)
      .then((v) => {
        callback(true);
      })
      .catch((err) => {
        callback(false);
      });
  };
  signInWithFacebook = (provider) => {
    if (!this.auth0) return;
    this.auth0
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log("errr ", error);
        // ...
      });
  };

  signInWithGitHub = (provider) => {
    if (!this.auth0) return;
    this.auth0
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        // ...
      });
  };

  createEmailAndPassword = (email, password, callback) => {
    if (!this.auth0) return;
    this.auth0
      .createUserWithEmailAndPassword(email, password)
      .then((v) => {
        callback(v);
      })
      .catch((err) => {
        //console.log(err);
        callback(false);
      });
  };

  signInWithEmailPassword = (email, password, callback) => {
    if (!this.auth0) return;

    this.auth0
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        callback(true);
      })
      .catch((err) => {
        callback(false);
      });
  };

  singOut = () => {
    if (!this.auth0) return;
    this.auth0.signOut();
  };

  isSinghedIn = () => {
    if (!this.auth0) return;
    this.auth0.currentUser &&
      this.auth0.currentUser.getIdToken().then((t) => {});
    return this.auth0.currentUser;
  };

  refreshToken = (callback) => {
    this.auth0.onIdTokenChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          // sessionStorage.setItem("accessToken", token);
          const status = this.decodeToken(token);
          callback(status);
        });
        sessionStorage.setItem("phoneNumber", user.phoneNumber);
        sessionStorage.setItem("uid", user.uid);
      } else {
        callback(false);
      }
    });
  };

  decodeToken = (token) => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
}
