import firebase from 'firebase'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCtudi_tnkHAoVID8axEojjAmX_LUbcnUk",
    authDomain: "fir-app-f3270.firebaseapp.com",
    projectId: "fir-app-f3270",
    storageBucket: "fir-app-f3270.appspot.com",
    messagingSenderId: "966645686466",
    appId: "1:966645686466:web:f608a40b0dacb97a30db5b"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  const auth = fire.auth()
  const data = fire.firestore()

  export { auth, data }