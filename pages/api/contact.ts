import { NextApiRequest, NextApiResponse } from 'next';

const functionURL =
  process.env.MODE === 'development'
    ? 'http://127.0.0.1:5001/wesleylemahieu-com/us-central1/sendEmail'
    : 'https://us-central1-wesleylemahieu-com.cloudfunctions.net/sendEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, business, phone, inquiry } = req.body;

  // validate input
  if (!name?.length) {
    res.status(500).send({ error: 'Name is missing' });
  } else if (!email?.length) {
    res.status(500).send({ error: 'Email is missing' });
  } else if (!inquiry?.length) {
    res.status(500).send({ error: 'Inquiry is missing' });
  } else {
    // construct email body
    const html = `
      NAME: ${name}<br/>
      EMAIL: ${email}<br/>
      PHONE: ${phone}<br/>
      BUSINESS: ${business}<br/>
      INQUIRY: ${inquiry}
    `;

    const emailPayload = {
      from: 'wes@pugsllc.com',
      to: 'wesleylemahieu@gmail.com',
      subject: 'WL Inquiry',
      html,
    };

    // send email to cloud function
    await fetch(functionURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    // redirect user to success page
    res.status(200).redirect('/contact?success');
  }
}
