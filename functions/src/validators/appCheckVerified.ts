import * as functions from "firebase-functions";
import { CallableContext } from "firebase-functions/v1/https";

const validateAppCheckVerified = (context: CallableContext) => {
  if (context.app == undefined) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called from an App Check verified app."
    );
  }
};

export default validateAppCheckVerified;
