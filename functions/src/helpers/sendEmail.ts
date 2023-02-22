/**
 * sendEmail.ts
 *
 * A cloud function for sending emails, triggered via cloud task.
 */
import * as sgMail from '@sendgrid/mail';

// send the email using a given template and data
const sendEmail = async (text: string) => {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
  sgMail.setApiKey(SENDGRID_API_KEY);
  sgMail
  .send({
    from: 'wes@pugsllc.com',
    to: 'wesleylemahieu@gmail.com',
    subject: 'WesleyLeMahieu.com Inquiry',
    html: text,
  })
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
    return Promise.reject(error);
  })

  return Promise.resolve();
};

export default sendEmail;