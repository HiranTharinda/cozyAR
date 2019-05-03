import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyAHMzwvV93JgrVEjRGUCcH6sL31ISgCAFo",
    authDomain: "cozyar-f8b26.firebaseapp.com",
    databaseURL: "https://cozyar-f8b26.firebaseio.com",
    projectId: "cozyar-f8b26",
    storageBucket: "cozyar-f8b26.appspot.com",
    messagingSenderId: "696499435499"
  };
  firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();

