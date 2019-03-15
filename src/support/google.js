import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAt-bcSq9J2Ne2l-Nf4mHjgMOw8S0jKf-k",
    authDomain: "fir-5179c.firebaseapp.com",
    databaseURL: "https://fir-5179c.firebaseio.com",
    projectId: "fir-5179c",
    storageBucket: "fir-5179c.appspot.com",
    messagingSenderId: "381605975239"
  };

  firebase.initializeApp(config)
  export const ref = firebase.database().ref();
  export const auth = firebase.auth;
  export const provider = new firebase.auth.GoogleAuthProvider();
  