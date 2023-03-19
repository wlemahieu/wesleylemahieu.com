import Link from 'next/link';

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Crystal Bay Software',
    synopsis: 'Maintained a crucial legacy medical infrastructure between two apps for providers and patient usage.',
    technologies: [
      'Typescript',
      'React.js',
      'Redux',
      'Node.js',
      'MySQL',
      'PostgreSQL',
      'Google Cloud Platform',
      'App Engine',
      'Material-UI',
    ],
    timeframe: ['Jan 2020', 'Mar 2023'],
  },
  {
    title: 'Software Engineer',
    company: 'Conviva Ltd.',
    synopsis: 'Continued app enhancements for the newly integrated social analytics product-line from Delmondo Inc.',
    technologies: [
      'Javascript',
      'React.js',
      'Redux',
      'Node.js',
      'MySQL',
      'Ant Design',
      'Facebook API',
      'Twitter API',
      'YouTube API',
    ],
    timeframe: ['Dec 2018', 'Jan 2020'],
  },
  {
    title: 'Full Stack Software Developer',
    company: 'Delmondo Inc.',
    synopsis: `Enhanced, maintained & integrated Delmondo's feature social analytics product into Conviva's product-line.`,
    technologies: [
      'Javascript',
      'React.js',
      'Redux',
      'Node.js',
      'MySQL',
      'Ant Design',
      'HighCharts',
      'SequelizeDB',
      'Facebook API',
      'Twitter API',
      'YouTube API',
    ],
    timeframe: ['Dec 2016', 'Dec 2018'],
  },
  {
    title: 'Business Systems Engineer',
    company: 'MediaTemple Inc.',
    synopsis: `Wore many hats then created an award-winning workflow management employee app called 'The Matrix'.`,
    technologies: ['Javascript', 'AngularJS', 'Node.js', 'MySQL', 'PHP', 'Ant Design', 'LiveChat API'],
    timeframe: ['Jan 2008', 'Jul 2016'],
  },
];

export default function Experience() {
  return (
    <>
      <div className="header">
        <h1>Experience</h1>
      </div>

      <div className="content">
        <h2 className="content-subhead">Related links</h2>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          <li>
            <Link href="/Wesley LeMahieu's Resume.pdf" target="_blank" className="link">
              Download Resume PDF
            </Link>
          </li>
          <li>
            <Link
              href="https://docs.google.com/document/d/1ZMJigF71Uv1wnDd4dc2Dhg2pf8SoPJiT9lhLUyaz1HY/edit"
              target="_blank"
              className="link"
            >
              Visit Resume Doc
            </Link>
          </li>

          <li>
            <Link href="https://github.com/wlemahieu" target="_blank" className="link">
              GitHub
            </Link>
          </li>
          <li>
            <Link href="https://stackoverflow.com/users/904956/wesley-lemahieu" target="_blank" className="link">
              Stackoverflow
            </Link>
          </li>
        </ul>
        <div>
          <div className={`gradient-box-1`} style={{ padding: '2rem', margin: '3rem 0rem 0rem 1rem' }}>
            <p>
              My first website was a fan-site for the famous television show 'The Simpsons'. Built in the early 90s on
              the FortuneCity web hosting platform, it pre-dated any Javascript framework and even PHP. Since then I've
              learned quite a few skills at each stop in my career path. I have some side development experience with
              cryptocurrencies like Nano and Solana.
            </p>
          </div>
          <div style={{ padding: '1rem', textAlign: 'center' }}>
            {experiences.map((experience, key) => {
              return (
                <div key={`exp-${key}`} style={{ margin: '2rem 0rem', borderBottom: '1px solid grey' }}>
                  <h1>{experience.title}</h1>
                  <h2>@ {experience.company}</h2>
                  <h3>{experience.timeframe.join(' - ')}</h3>
                  <p>{experience.synopsis}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
