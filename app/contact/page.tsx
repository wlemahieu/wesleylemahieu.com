import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Contact() {
  return (
    <div className="container mx-auto text-center flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-base5">
        Direct Contact
      </h1>
      <div className="container mx-auto max-w-screen-sm">
        <p className="text-base text-base3">
          {`Feel free to contact me directly:`}
        </p>
        <p className="text-base text-base1">
          {`WesleyLeMahieu 'at' Gmail 'dot' Com`}
        </p>
      </div>
    </div>
  )
}
