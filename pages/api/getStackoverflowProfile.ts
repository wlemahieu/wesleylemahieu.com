import { NextApiRequest, NextApiResponse } from 'next'
import { doc, getDoc } from 'firebase/firestore';
import getFirestoreDb from '@helpers/getFirestoreDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getFirestoreDb();
  const ref = doc(db, `stackoverflow`, `profile`)
  const resp = await getDoc(ref);
  const data = resp.data();
  res.status(200).send(data);
}
