import * as functions from 'firebase-functions';
export interface EmailPayloadI {
  to: string;
  from: string;
  subject: string;
  html: string;
}

export default async function sendEmail(emailPayload: EmailPayloadI) {
  const sgMail = await (await import('@sendgrid/mail')).default;

  const { from, to, subject, html } = emailPayload;

  if (!from?.length) {
    throw new functions.https.HttpsError('internal', 'No "from" address provided');
  }
  if (!to?.length) {
    throw new functions.https.HttpsError('internal', 'No "to" address provided');
  }
  if (!subject?.length) {
    throw new functions.https.HttpsError('internal', 'No "subject" provided');
  }
  if (!html?.length) {
    throw new functions.https.HttpsError('internal', 'No "html" provided');
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;

  let fixedTo = 'wesleylemahieu@gmail.com';
  if (process.env.MODE === 'development') {
    fixedTo = 'wesleylemahieu@gmail.com';
  } else {
    fixedTo = to;
  }

  sgMail.setApiKey(SENDGRID_API_KEY);
  return await sgMail.send({ from, to: fixedTo, subject, html }).catch((error) => {
    console.log('##### sendEmail #####', error);
    throw new functions.https.HttpsError('internal', error.message);
  });
}
