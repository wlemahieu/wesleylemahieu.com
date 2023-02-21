import * as functions from 'firebase-functions';
import { initializeApp } from '@firebase/app';
import { doc, getFirestore, setDoc} from '@firebase/firestore';
import firebaseConfig from './firebase-config.json';
import startFirestoreEmulator from './helpers/startFirestoreEmulator';
import crawl from './helpers/crawl';

const crawlStackProfile = functions
.region('us-central1')
.runWith({
  timeoutSeconds: 60,
  memory: '2GB',
})
.pubsub.schedule('every 6 hours')
.onRun(async () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  startFirestoreEmulator();

  const stats = await crawl();
  
  return await setDoc(
    doc(db, `stackoverflow`, 'profile'),
    { stats },
    { merge: true },
  );
});

export default crawlStackProfile;
