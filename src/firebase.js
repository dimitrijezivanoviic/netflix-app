import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGw_ksc4XXBVtDAkj-_Mc-lfWJgFdDUuI",
  authDomain: "netflix-clone-9fc77.firebaseapp.com",
  projectId: "netflix-clone-9fc77",
  storageBucket: "netflix-clone-9fc77.appspot.com",
  messagingSenderId: "210372332595",
  appId: "1:210372332595:web:61ab981f36a8a51476e746",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp);

export { auth };
// export default db;
