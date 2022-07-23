import  firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDhVlXo-m76E2ZQGxvNR6iBm_WwJeCap3g",
  authDomain: "whatsapp-clone-19050.firebaseapp.com",
  projectId: "whatsapp-clone-19050",
  storageBucket: "whatsapp-clone-19050.appspot.com",
  messagingSenderId: "191527329078",
  appId: "1:191527329078:web:ff545df33a52081965a797",
  measurementId: "G-F05HT8JLTS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export{auth,provider};
export default db;