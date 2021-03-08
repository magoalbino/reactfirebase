import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAznQuEnar7E36F0qUeAhIsjPcwvEYQoRY",
    authDomain: "curso-eventos.firebaseapp.com",
    projectId: "curso-eventos",
    storageBucket: "curso-eventos.appspot.com",
    messagingSenderId: "575893968478",
    appId: "1:575893968478:web:6a61af618c074c3ece86cf"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);