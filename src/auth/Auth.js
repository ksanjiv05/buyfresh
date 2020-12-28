import firebase from "firebase/app";
import "firebase/auth";

export default class Auth {
  constructor(history) {
    console.log("run--");
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
      console.log("i am...");
    } else {
      console.log("i am else");
      this.auth0 = firebase.app().auth();
    }
    // this.auth = firebase.auth();
  }

  signInWithGoogle = (googlprovider) => {
    console.log("---------------------");
    if (!this.auth0) return;
    this.auth0
      .signInWithPopup(googlprovider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("user ", token);
        console.log("user -google-------", user);
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
    console.log("---------------------");
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
  varifyOTP = (otp, callback) => {
    window.confirmationResult
      .confirm(otp)
      .then(function (result) {
        console.log(" User signed in successfully.", result.user);
        var user = result.user;
        user.getIdToken().then((idToken) => {
          console.log(idToken);
        });
        callback(true);
        this.history.push("/");
      })
      .catch((err) => {
        console.log("-----------", err);
        callback(false);
      });
  };
  signInWithFacebook = (provider) => {
    console.log("---------------------");
    if (!this.auth0) return;
    this.auth0
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("user ", token);
        console.log("user --------", user);
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
    console.log("---------------------");
    if (!this.auth0) return;
    this.auth0
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
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

    console.log("email is ", email, "password ", password);
    this.auth0
      .createUserWithEmailAndPassword(email, password)
      .then((v) => {
        callback(v);
      })
      .catch((err) => {
        console.log(err);
        callback(false);
      });
  };

  signInWithEmailPassword = (email, password, callback) => {
    if (!this.auth0) return;

    console.log("email is ", email, "password ", password);
    this.auth0
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        callback(true);
      })
      .catch((err) => {
        console.log(err);
        callback(false);
      });
  };

  singOut = () => {
    if (!this.auth0) return;
    console.log("-------------++++++++--------");
    this.auth0.signOut();
  };

  isSinghedIn = () => {
    if (!this.auth0) return 0;
    console.log("this is curenrt user ", this.auth0.currentUser);
    return this.auth0.currentUser;
  };
}
