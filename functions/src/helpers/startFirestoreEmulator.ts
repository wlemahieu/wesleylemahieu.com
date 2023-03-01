import { connectFirestoreEmulator } from "firebase/firestore";
import getFirestoreDb from "./getFirestoreDb";

let isEmulator = false;

const startFirestoreEmulator = async () => {
  const db = getFirestoreDb();

  if (process.env.MODE === "development" && !isEmulator) {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    isEmulator = true;
  }
};

export default startFirestoreEmulator;
