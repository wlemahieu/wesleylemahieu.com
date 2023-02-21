import { FirebaseApp, getApps, initializeApp } from '@firebase/app';
import { connectAuthEmulator, getAuth } from '@firebase/auth';
import { getFunctions, connectFunctionsEmulator } from '@firebase/functions';
import { getStorage, connectStorageEmulator } from '@firebase/storage';
import firebaseConfig from '@config/firebase-config.json';

const useGetApp = (): FirebaseApp => {
  const apps = getApps();
  if (!apps?.length) {
    const app = initializeApp(firebaseConfig);
    // connect to the local emulators
    if (process.env.MODE === 'development') {
      console.log('----- DEVELOPMENT MODE -----');
      const region = 'us-central1';
      const functions = getFunctions(app, region);
      const storage = getStorage(app);
      const auth = getAuth(app);
      connectFunctionsEmulator(functions, '127.0.0.1', 5001);
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      connectStorageEmulator(storage, '127.0.0.1', 9199);
    }
    return app;
  }
  return apps[0];
};

export default useGetApp;
