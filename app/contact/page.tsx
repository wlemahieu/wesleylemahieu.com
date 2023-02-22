'use client';

/**
 * Contact page view
 */
import { FC } from 'react';
import { useFormik } from 'formik';
import { FirebaseApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import useGetApp from '@hooks/useGetApp';
import Link from 'next/link';

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
      <div className="container mx-auto max-w-screen-sm text-base3 mt-6 mb-3">
        <p>Email directly at: <Link className="text-base text-base1" href={`mailto:softwarewes@gmail.com`}>softwarewes@gmail.com</Link></p>
      </div>

      <div className="container mx-auto max-w-screen-sm border-2 text-base3 mt-3">
        <div className="w-full max-w-xs mx-auto">
          <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" autoComplete='off' placeholder="Name" onChange={formik.handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" autoComplete='off' placeholder="Email" onChange={formik.handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" autoComplete='off' placeholder="Phone" onChange={formik.handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="company" type="text" autoComplete='off' placeholder="Company" onChange={formik.handleChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Inquiry
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="inquiry" type="text" autoComplete='off' placeholder="Inquiry" onChange={formik.handleChange} />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;