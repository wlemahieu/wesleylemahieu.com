import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '@config/firebase-config.json';

const getFirestoreDb = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
};

export default getFirestoreDb;