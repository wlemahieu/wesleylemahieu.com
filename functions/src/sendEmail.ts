import * as functions from 'firebase-functions';
import doSendEmail from './helpers/sendEmail';

const sendEmail = functions
  .region('us-central1')
  .runWith({
    secrets: ['SENDGRID_API_KEY'],
    memory: '256MB',
  })
  .https.onRequest(async (req, res) => {
    const { from, to, subject, html } = req.body;

    if (!from) {
      throw new functions.https.HttpsError('internal', 'No FROM was provided.');
    }
    if (!to) {
      throw new functions.https.HttpsError('internal', 'No TO was provided.');
    }
    if (!subject) {
      throw new functions.https.HttpsError('internal', 'No SUBJECT was provided.');
    }
    if (!html) {
      throw new functions.https.HttpsError('internal', 'No HTML was provided.');
    }

    // build email payload
    const emailPayload = { from, to, subject, html };

    await doSendEmail(emailPayload);

    res.status(200).send(true);
  });

export default sendEmail;
