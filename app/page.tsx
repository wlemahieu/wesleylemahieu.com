import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function About() {
  return (
    <div className="container mx-auto text-center flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-base1">
        {`Hi, I'm Wes!`}
      </h1>
      <div className="flex justify-center m-4">
        <Image src="/wes-pha-chor-point.jpeg" width="400" height="533" alt="A picture of Wesley LeMahieu in Phi Phi Islands, Thailand." />
      </div>
      <div className="container mx-auto max-w-screen-sm">
        <p className="text-base text-base3 mb-4">
          {`\n
          Thank you for taking the time to visit!\n
          I'm extremely passionate about software and web apps.\n
          You'll find me in VSCode on a Friday night tinkering with ideas as a form of entertainment.\n
          `}
        </p>
        <p className="text-base text-base2">
          {`\n
          You might also find me exploring another jungle in Thailand...
          `}
        </p>
      </div>
    </div>
  )
}
