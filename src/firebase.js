import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCv2BlJFA6O3d-ehPEnBSlZ_fsyI-mcxLs",
    authDomain: "fb-mern-aa83a.firebaseapp.com",
    projectId: "fb-mern-aa83a",
    storageBucket: "fb-mern-aa83a.appspot.com",
    messagingSenderId: "983425013758",
    appId: "1:983425013758:web:fb498e7c9039d4322ed2af",
    measurementId: "G-EXCRZGGZC7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()

export { auth, provider }
export default db