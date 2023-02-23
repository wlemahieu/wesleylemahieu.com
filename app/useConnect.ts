'use client';

import { initializeApp } from '@firebase/app';
import { getFunctions, connectFunctionsEmulator } from '@firebase/functions';
import firebaseConfig from '@config/firebase-config.json';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const useConnect = () => {
  const app = initializeApp(firebaseConfig);
  // connect to the local emulators
  if (process.env.MODE === 'development') {
    console.log('----- DEVELOPMENT MODE -----');
    const region = 'us-central1';
    const functions = getFunctions(app, region);
    const db = getFirestore(app);
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    console.log('connected???')
  }

  return null;
};

export default useConnect;
