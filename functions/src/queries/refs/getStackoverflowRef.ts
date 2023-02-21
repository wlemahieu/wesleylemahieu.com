import { collection, CollectionReference, DocumentData } from "firebase/firestore";
import getFirestoreDb from "../../helpers/getFirestoreDb";

const getStackoverflowRef = (): CollectionReference<DocumentData> => {
  const db = getFirestoreDb();
  const ref = collection(db, 'stackoverflow');
  return ref;
};

export default getStackoverflowRef;