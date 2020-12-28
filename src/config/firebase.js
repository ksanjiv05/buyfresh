import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAB2CTBG_HIdM254a785sbr1voYTBHOJuE",
  authDomain: "buyfreshbro.firebaseapp.com",
  projectId: "buyfreshbro",
  storageBucket: "buyfreshbro.appspot.com",
  messagingSenderId: "732112326325",
  appId: "1:732112326325:web:9d8ff946adf7465fbf78fc",
  databaseURL: "https://buyfreshbro.appspot.com",
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
