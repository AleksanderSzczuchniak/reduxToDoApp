import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAp44K0DOwi5jgHBUjKt-D1hldSBfV3Oqk",
  authDomain: "poniedzialek-ab82f.firebaseapp.com",
  databaseURL: "https://poniedzialek-ab82f.firebaseio.com",
  projectId: "poniedzialek-ab82f",
  storageBucket: "poniedzialek-ab82f.appspot.com",
  messagingSenderId: "622626829361"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const database = firebase.database()
export const googleProvider = new firebase.auth.GoogleAuthProvider()