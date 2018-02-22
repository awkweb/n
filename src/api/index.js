import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: process.env.firebase.apiKey,
  authDomain: process.env.firebase.authDomain,
  databaseURL: process.env.firebase.databaseURL,
  projectId: process.env.firebase.projectId,
});
// const db = firebase.database();
const getAppUrl = () =>
  `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' : ''}${window.location.port}`;
const auth = () => firebase.auth();
const getCurrentUser = () => auth().currentUser;

export default {
  // AUTH
  getCurrentUser,
  logIn: (email, password) => auth().signInWithEmailAndPassword(email, password),
  logOut: () => auth().signOut(),
  sendEmailVerification: async () => getCurrentUser().sendEmailVerification({ url: getAppUrl() }),
  sendPasswordResetEmail: async email => auth().sendPasswordResetEmail(email, { url: getAppUrl() }),
  signUp: (email, password) => auth().createUserWithEmailAndPassword(email, password),
  updateProfile: async data => getCurrentUser().updateProfile(data),
  watchAuthStateChanged: callback => auth().onAuthStateChanged(callback),
  // EDITOR
  getDataForUserId: userId =>
    new Promise(resolve =>
      firebase
        .database()
        .ref(`users/${userId}`)
        .once('value')
        .then(res => resolve(res.val()))),
};
