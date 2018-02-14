import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: process.env.firebase.apiKey,
  authDomain: process.env.firebase.authDomain,
  projectId: process.env.firebase.projectId,
});
const auth = firebase.auth();
// const db = firebase.database();

export default {
  logIn: (email, password) => auth.signInWithEmailAndPassword(email, password),
  signUp: (email, password) => auth.createUserWithEmailAndPassword(email, password),
  logOut: () => auth.signOut(),
};
