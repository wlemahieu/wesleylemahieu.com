'use client';

/**
 * Contact page view
 */
import { FC } from 'react';
import { useFormik } from 'formik';
import { FirebaseApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import useGetApp from '@hooks/useGetApp';

const Contact: FC = () => {
  const app = useGetApp();
  const region = 'us-central1';
  const functions = getFunctions(app as FirebaseApp, region);
  const sendInquiry = (values: any) => {
    const { email, inquiry, name, phone, company } = values;
    const text = `
      NAME: ${name}<br/>
      EMAIL: ${email}<br/>
      PHONE: ${phone}<br/>
      COMPANY: ${company}<br/>
      INQUIRY: ${inquiry}
    `;
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

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      inquiry: '',
    },
    onSubmit: (values) => {
      sendInquiry(values);
      formik.resetForm();
    },
    validate,
  });

  return (
    <div className="container mx-auto text-center flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-base5">
        Direct Contact
      </h1>
      
      <div className="container mx-auto max-w-screen-sm border-2 text-base3 mt-6">
        <div className="w-full max-w-xs mx-auto">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
              <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Sign In
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', rowGap: '.5rem' }} >
          <input
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            required
          />
          <input
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
          />
          <input
            id="company"
            name="company"
            value={formik.values.company}
            onChange={formik.handleChange}
            required
          />
          <input
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            required
          />
          <input
            id="inquiry"
            name="inquiry"
            value={formik.values.inquiry}
            onChange={formik.handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;