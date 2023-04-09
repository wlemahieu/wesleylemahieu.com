export default async function About() {
  return (
    <>
      <div className="header">
        <h1>About</h1>
      </div>

      <div className="content">
        <h2 className="content-subhead">Welcome!</h2>
        <div className={`gradient-box-1`} style={{ padding: '2rem', margin: '3rem 0rem 0rem 1rem' }}>
          <p>
            My name is Wesley LeMahieu. I'm a Senior Software Engineer with 14+ years of full-stack experience and a
            deep understanding of web application development. I'm passionate about technology and producing high
            quality, scalable software. I enjoy focusing on the end user's experience and ensuring user interfaces are
            clean. I like to mentor and help others.
          </p>
        </div>
      </div>
    </>
  );
}
