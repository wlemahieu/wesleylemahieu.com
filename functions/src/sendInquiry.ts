import * as functions from 'firebase-functions';
import sendEmail from './helpers/sendEmail';
import startFirestoreEmulator from './helpers/startFirestoreEmulator';
// import validateAppCheckVerified from './validators/appCheckVerified';

const sendInquiry = functions
  .region('us-central1')
  .runWith({
    secrets: ['SENDGRID_API_KEY'],
    memory: '256MB',
  })
  .https.onCall(async (data, context) => {
    // validateAppCheckVerified(context);
    startFirestoreEmulator();
    
    // destructure payload
    const { text } = data;
    if (!text) {
      throw new functions.https.HttpsError(
        'internal',
        'No TEXT was provided.',
      );
    }

    return await sendEmail(text);
  });

export default sendInquiry;