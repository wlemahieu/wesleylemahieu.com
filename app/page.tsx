import Image from 'next/image';
import Link from 'next/link';
import wes from '../public/wes.png';

export default async function About() {
  return (
    <div className="container mx-auto text-center flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-base5">About Me</h1>
      <div className="flex justify-center mt-8">
        <Image src={wes} width="200" height="266" alt="A headshot picture of Wesley LeMahieu." priority />
      </div>
      <div className="container mx-auto max-w-screen-sm">
        <div className={`gradient-box-1 mt-12`}>
          <p className="text-base text-base3 m-4 text-center">
            Hello! My name is Wesley LeMahieu. Thank you for visiting.
          </p>
          <p className="text-base text-base3 m-4">
            I'm extremely passionate about <i>quality software</i> and the <b>user experience</b>. I'm inherently
            looking to learn and help others.
          </p>
          <p className="text-base text-base3 m-4">
            Lately, I've spent a bit of time on{' '}
            <Link className="text-base1" href="/stackoverflow">
              Stackoverflow
            </Link>{' '}
            helping other developers resolve issues in their app or with their understanding of concepts.
          </p>
        </div>
      </div>
    </div>
  );
}
