import './globals.css'
import Navigation from '@components/navigation'
import { Lato } from '@next/font/google'

const font = Lato({ subsets: ['latin'], weight: '400' })

const Nav = Navigation as any;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={font.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Nav />
        <div className="p-4">
          {children}
        </div>
      </body>
    </html>
  )
}
