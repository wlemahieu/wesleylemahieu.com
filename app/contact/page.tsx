import 'server-only';
import Link from 'next/link';

const formURL = process.env.MODE === 'development' ? '/api/contact' : 'https://marijuanalocators.com/api/contact';

export default function ContactPage() {
  return (
    <>
      <div className="header">
        <h1>Contact</h1>
      </div>

      <div className="content">
        <h2 className="content-subhead">Get in touch</h2>
        <div>
          <div className="gradient-box-1" style={{ padding: '2rem', margin: '3rem 0rem 0rem 1rem' }}>
            <p>
              Use the form below or email me at:{' '}
              <Link href={`mailto:softwarewes@gmail.com`}>softwarewes@gmail.com</Link>
            </p>
          </div>
        </div>

        <div style={{ padding: '1rem' }}>
          <form action={formURL} method="post" className="pure-form">
            <fieldset>
              <fieldset className="pure-group">
                <input name="name" className="pure-input-1" type="text" placeholder="Name" required />
                <input name="email" className="pure-input-1" type="email" placeholder="Email" required />
                <input name="business" className="pure-input-1" type="text" placeholder="Business (optional)" />
                <input name="phone" className="pure-input-1" type="text" placeholder="Phone (optional)" />
                <textarea name="inquiry" className="pure-input-1" placeholder="Inquiry" required />
              </fieldset>
              <button type="submit" className="pure-button pure-button-primary">
                Submit
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
