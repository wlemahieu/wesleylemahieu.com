'use client';

/**
 * Contact page view
 */
import { FC } from 'react';
import { useFormik, Formik, Form, Field } from 'formik';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import Link from 'next/link';
import { initializeApp } from '@firebase/app';
import firebaseConfig from '@config/firebase-config.json';
import '../globals.css';

const initialValues = {
  name: '',
  email: '',
  inquiry: '',
};

const Contact: FC = () => {
  const app = initializeApp(firebaseConfig);
  const region = 'us-central1';
  const functions = getFunctions(app, region);

  const sendInquiry = (values: any) => {
    const { email, inquiry, name, phone, company } = values;
    const text = `
      NAME: ${name}<br/>
      EMAIL: ${email}<br/>
      INQUIRY: ${inquiry}
    `;

    // connect to the local emulators
    if (process.env.NEXT_PUBLIC_MODE === 'development') {
      console.log('----- DEVELOPMENT MODE -----');
      connectFunctionsEmulator(functions, '127.0.0.1', 5001);
    }
    const sendInquiryFn = httpsCallable(functions, 'sendInquiry');
    sendInquiryFn({ text });
  };

  const validate = (values: any) => {
    const errors: any = {};
    const { email, name, inquiry } = values;
    if (!email?.length) {
      errors.email = 'No email entered';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email format';
    }
    if (!name?.length) {
      errors.name = 'No name entered';
    }
    if (!inquiry?.length) {
      errors.inquiry = 'No inquiry entered';
    }
    return errors;
  };

  return (
    <div className="container mx-auto text-center flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-base5">Direct Contact</h1>
      <div className="container mx-auto max-w-screen-sm mt-8">
        <div className={`gradient-box-1`}>
          <p className="text-base text-base3 p-4">
            Contact me directly at:{' '}
            <Link className="text-base text-base1" href={`mailto:softwarewes@gmail.com`}>
              softwarewes@gmail.com
            </Link>{' '}
            or use the form below.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-screen-sm text-base3 mt-8">
        <div className="w-full max-w-xs mx-auto m-3">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              sendInquiry(values);
              actions.resetForm();
            }}
            validate={validate}
          >
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="inquiry" className="block text-gray-700 text-sm font-bold mb-2">
                  Inquiry
                </label>
                <Field
                  rows={10}
                  cols={5}
                  id="inquiry"
                  name="inquiry"
                  type="textarea"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                type="submit"
                style={{
                  border: '1px solid white',
                  borderRadius: '8px',
                  padding: '.5rem 1rem',
                }}
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Contact;
