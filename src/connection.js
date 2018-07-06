import flamelink from "flamelink";

export const firebaseCon = flamelink({
  apiKey: "AIzaSyBNyPmD_MN4MGGKfZjaMHSJqTnxK9QF9_U", // required
  authDomain: "minauktion-ea904.firebaseapp.com", // required
  databaseURL: "https://minauktion-ea904.firebaseio.com", // required
  projectId: "minauktion-ea904", // required
  storageBucket: "minauktion-ea904.appspot.com", // required
  messagingSenderId: "400569447687", // optional
  locale: "en-US" // optional
});
