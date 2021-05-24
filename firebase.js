import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCbdKDjK_Gm9ignVcwoL4XHgNnqfsfaJYk",
    authDomain: "whatsapp-clone-b29a9.firebaseapp.com",
    projectId: "whatsapp-clone-b29a9",
    storageBucket: "whatsapp-clone-b29a9.appspot.com",
    messagingSenderId: "406945462920",
    appId: "1:406945462920:web:e2fa9736083904eb1e7d3d"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export {db,auth,provider};
