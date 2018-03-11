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
  createNote: (userId, dateCreated, note) =>
    new Promise(resolve =>
      firebase
        .database()
        .ref(`users/${userId}/notes`)
        .push({
          ...note,
          date_created: dateCreated,
          date_modified: dateCreated,
        })
        .then(res => resolve({
          ...note,
          body: '',
          date_created: dateCreated,
          date_modified: dateCreated,
          key: res.key,
        }))),
  deleteNote: (userId, noteKey) =>
    new Promise(resolve =>
      firebase
        .database()
        .ref(`users/${userId}/notes/${noteKey}`)
        .remove()
        .then(() => resolve(true))),
  getDataForUserId: userId =>
    new Promise(resolve =>
      firebase
        .database()
        .ref(`users/${userId}`)
        .once('value')
        .then(res => resolve(res.val()))),
  updateNote: (userId, key, dateModified, note) =>
    new Promise(resolve =>
      firebase
        .database()
        .ref(`users/${userId}/notes/${key}`)
        .update({
          name: note.name,
          body: note.body,
          date_modified: dateModified,
        })
        .then(() => resolve({ key, date_modified: dateModified }))),
  updateTheme: (userId, theme) =>
    new Promise(resolve =>
      firebase
        .database()
        .ref(`users/${userId}`)
        .update({ theme })
        .then(() => resolve(theme))),
};
