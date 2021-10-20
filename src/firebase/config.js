import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCbVD_fvUcX1uv1xhkEchX0vndoKuBWZs",
    authDomain: "react-native-app-65243.firebaseapp.com",
    projectId: "react-native-app-65243",
    storageBucket: "react-native-app-65243.appspot.com",
    messagingSenderId: "616764926412",
    appId: "1:616764926412:web:928ca9082c75f6e3ef1569"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = app.firestore();
