import Image from 'next/image'
import Link from 'next/link';
const baseURL = process.env.MODE === 'development' ? 'http://127.0.0.1:5000' : 'https://wesleylemahieu.com';

export default async function About() {
  let stats: any = {};

  try {
    const results = await fetch(`${baseURL}/api/getStackoverflowProfile`);
    const json = await results.json();
    stats = json.stats;
  } catch (e) {
    console.log(e);
  }
  
  return (
    <div className="container mx-auto text-center flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-base1 mb-4">
        {`Hi, I'm Wes!`}
      </h1>
      <div className="container mx-auto max-w-screen-sm mb-4">
        <p className="text-base text-base3">
          {`\n
          Thanks for visiting.\n
          I'm extremely passionate about software and web apps.\n
          You'll find me in Codesandbox or VSCode tinkering with ideas, as well as on Stackoverflow.com answering questions.`}
        </p>
      </div>
      <div>
        <div>
          I&apos;m in the <span className="text-base5">{stats?.achievement}</span> on <Image src="/stackoverflow.svg" width="25" height="25" style={{ display: 'inline'}} alt="Stackoverflow logo" priority /> Stackoverflow.com.
        </div>
        <div>
          Check out <Link href="https://stackoverflow.com/users/904956/wesley-lemahieu?tab=answers&sort=votes" target="_blank" className='text-base text-base2'>my answers</Link> to see how I&apos;ve contributed.
        </div>
        <div>
          Reputation: <span className="text-base4">{stats?.reputation}</span>
        </div>
        <div>
          People Reached: <span className="text-base4">{stats?.reached}</span>
        </div>
        <div>
          Total Answers: <span className="text-base4">{stats?.answers}</span>
        </div>
      </div>
      <div className="flex justify-center m-4">
        <Image src="/wes-pha-chor-point.jpeg" width="400" height="533" alt="A picture of Wesley LeMahieu in Phi Phi Islands, Thailand." priority />
      </div>
      <div className="container mx-auto max-w-screen-sm">
        <p className="text-base text-base2">
          {`\n
          Exploring another jungle in Thailand...
          `}
        </p>
      </div>
    </div>
  )
}
