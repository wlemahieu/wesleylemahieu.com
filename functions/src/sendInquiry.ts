import * as functions from 'firebase-functions';
import sendEmail from './helpers/sendEmail';
import startFirestoreEmulator from './helpers/startFirestoreEmulator';
import validateAppCheckVerified from './validators/appCheckVerified';

const sendInquiry = functions
  .region('us-central1')
  .runWith({
    enforceAppCheck: true,
    secrets: ['SENDGRID_API_KEY'],
    memory: '256MB',
  })
  .https.onCall(async (data, context) => {
    validateAppCheckVerified(context);
    startFirestoreEmulator();
    
    // destructure payload
    const { html } = data;
    if (!html) {
      throw new functions.https.HttpsError(
        'internal',
        'No HTML was provided.',
      );
    }

    return await sendEmail(html);
  });

export default sendInquiry;