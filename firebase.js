import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions"; // for cloud functions

const firebaseConfig = {
		apiKey: 'AIzaSyBnnsKjNyJISYWbGSbWHVArMI277YMgeDo',
	authDomain: 'whatsapp-next-19a5c.firebaseapp.com',
	projectId: 'whatsapp-next-19a5c',
	storageBucket: 'whatsapp-next-19a5c.appspot.com',
	messagingSenderId: '349913385150',
	appId: '1:349913385150:web:964de44a8ecc46d69fb6ef',
//     apiKey: process.env.REACT_APP_API_KEY,
// 	authDomain: 'whatsapp-next-19a5c.firebaseapp.com',
// 	projectId: 'whatsapp-next-19a5c',
// 	storageBucket: 'whatsapp-next-19a5c.appspot.com',
// 	messagingSenderId: process.env.REACT_APP_MSG_ID,
// 	appId: process.env.REACT_APP_APP_ID,
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
