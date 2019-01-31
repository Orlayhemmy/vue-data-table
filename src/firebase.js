import firebase, { firestore } from 'firebase';

// Initialize Firebase
const options = {
  projectId: 'britecore-bf340',
};
firebase.initializeApp(options);

const db = firestore();

export default db;

