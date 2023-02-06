import Link from 'next/link';
import styles from './page.module.css';

const experiences = [{
  title: 'Senior Software Engineer',
  company: 'Crystal Bay Software',
  synopsis: 'Maintained a crucial legacy medical infrastructure between two apps for providers and patient usage.',
  technologies: ['Typescript', 'React.js', 'Redux', 'Node.js', 'MySQL', 'PostgreSQL', 'Google Cloud Platform', 'App Engine', 'Material-UI'],
  timeframe: ['Jan 2020', 'Feb 2023']
}, {
  title: 'Software Engineer',
  company: 'Conviva Ltd.',
  synopsis: 'Continued app enhancements for the newly integrated social analytics product-line from Delmondo Inc.',
  technologies: ['Javascript', 'React.js', 'Redux', 'Node.js', 'MySQL', 'Ant Design', 'Facebook API', 'Twitter API', 'YouTube API'],
  timeframe: ['Dec 2018', 'Jan 2020']
}, {
  title: 'Full Stack Software Developer',
  company: 'Delmondo Inc.',
  synopsis: `Enhanced, maintained & integrated Delmondo's feature social analytics product into Conviva's products offering.`,
  technologies: ['Javascript', 'React.js', 'Redux', 'Node.js', 'MySQL', 'Ant Design', 'HighCharts', 'SequelizeDB', 'Facebook API', 'Twitter API', 'YouTube API'],
  timeframe: ['Dec 2016', 'Dec 2018']
}, {
  title: 'Business Systems Engineer',
  company: 'MediaTemple Inc.',
  synopsis: `Wore many hats then created an award-winning workflow management employee app called 'The Matrix'.`,
  technologies: ['Javascript', 'AngularJS', 'Node.js', 'MySQL', 'PHP', 'Ant Design', 'LiveChat API'],
  timeframe: ['Jan 2008', 'Jul 2016']
}];

export default function Experience() {
  return (
    <div className="container mx-auto text-center flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-base5">
        Experience Synopsis
      </h1>
      <div>
        <div className="flex justify-center text-base1 gap-x-10">
          <Link href="/Wesley LeMahieu's Resume.pdf" target="_blank">Resume PDF</Link>
          <Link href="https://docs.google.com/document/d/1ZMJigF71Uv1wnDd4dc2Dhg2pf8SoPJiT9lhLUyaz1HY/edit" target="_blank">Resume URL</Link>
        </div>
      </div>
      <div className="container mx-auto max-w-screen-sm">
        <div className={`${styles.intro} mt-12`}>
          <p className="text-base text-base3 m-4">
            {`\n
            I've been passionately coding for 12+ years - worked in the web industry for 15+ years - \n
            and creating websites since the Geocities & FortuneCity era!
            `}
          </p>
          <p className="text-base text-base3 m-4">
            {`\n
            I love creating new things and solving difficult problems. Reviving old code and optimizing for scale.\n
            `}
          </p>
        </div>
        <div className="mt-12 text-base2 pb-1">
          {experiences.map((experience, key) => {
            return (
              <div key={`exp-${key}`} className="mt-6 pb-6 border-b">
                <h1 className="text-2xl font-bold text-base1">{experience.title}</h1>
                <h2 className="text-md text-base4 italic">@ {experience.company}</h2>
                <h3 className="text-sm text-base2 italic">{experience.timeframe.join(' - ')}</h3>
                <p className="text-sm text-base3 max-w-screen-sm mr-12 ml-12 pt-2 pr-4 pl-4">
                  {experience.synopsis}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
