import 'server-only';
// import '@css/base-min.css';
// import '@css/pure-min.css';
// import "@css/grids-responsive-min.css";
// import '@css/global.css';

import { Lato } from '@next/font/google';

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
        <div>{children}</div>
      </body>
    </html>
  );
}
