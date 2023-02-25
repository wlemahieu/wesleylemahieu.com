import * as functions from 'firebase-functions';
import { getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import crawl from './helpers/crawl';

const crawlStackProfile = functions
.region('us-central1')
.runWith({
  timeoutSeconds: 60,
  memory: '2GB',
})
.pubsub.schedule('every 3 hours')
.onRun(async () => {
  const app = getApp();
  const db = getFirestore(app);
  const stats = await crawl();
  const docRef = db.collection('stackoverflow').doc('profile');
  return docRef.set({ stats }, { merge: true });
});

export default crawlStackProfile;
