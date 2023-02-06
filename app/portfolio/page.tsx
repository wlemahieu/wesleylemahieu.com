import Link from 'next/link'

const samples = [{
  title: 'CaseConsult.net',
  url: 'https://www.caseconsult.net',
  description: 'A new platform where mental health practicioners can consult with other professionals relating to their cases.',
  technologies: ['Typescript']
}, {
  title: 'PCPA Telehealth',
  url: 'https://www.pcpasf.com/',
  description: 'A platform for therapists & psychiatrists to document, communicate, invoice and schedule visitations with patients.',
  technologies: ['Javascript']
}, {
  title: `Conviva's Social Video Analytics`,
  url: 'https://www.conviva.com/social-video-analytics/',
  description: 'An app where businesses can view important metrics relating to their social media videos.',
  technologies: ['Javascript']
}, {
  title: `Delmondo's Social Video Analytics`,
  url: 'https://www.crunchbase.com/organization/delmondo',
  description: 'An app where businesses could view important metrics relating to their social media videos.',
  technologies: ['Javascript']
}, {
  title: `GoDaddy / MediaTemple Workflow Tool`,
  url: 'https://mediatemple.net/blog/media-temple-updates/the-2016-stevie-awards-our-customer-support-team-does-it-again/',
  description: 'An app which gathered useful metrics for customer support agents to help them improve their skills.',
  technologies: ['Javascript']
}]

export default function Portfolio() {
  return (
    <div className="container mx-auto text-center flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-base5">
        My Portfolio
      </h1>
      <div className="container mx-auto max-w-screen-sm">
        <p className="text-base text-base3 m-4">
          {`\n
          Much of my work occurs in private repositories which can't be shared.\n
          Although lately I've been expanding my open-source contributions on my `}
          <Link href="https://github.com/wlemahieu" target="_blank" className="text-base1">GitHub</Link>.
        </p>
        <div className="mt-12 text-base2 pb-1">
          {samples.map((experience, key) => {
            return (
              <div key={`exp-${key}`} className="mt-6 pb-6 border-b">
                <h1 className="text-2xl font-bold text-base1">
                  <Link href={experience.url}>{experience.title}</Link>
                </h1>
                <p className="text-sm text-base3 max-w-screen-sm mr-12 ml-12 pt-2 pr-4 pl-4">
                  {experience.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
