import './globals.css';

import { Lato } from '@next/font/google';
import Navigation from '@components/navigation';
import Menu from '@components/menu';

const font = Lato({ subsets: ['latin'], weight: '400' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Navigation>
          <Menu />
        </Navigation>
        <div className="p-4">{children}</div>
      </body>
    </html>
  );
}
