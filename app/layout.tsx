import 'server-only';
import '@css/base-min.css';
import '@css/pure-min.css';
// import "@css/grids-responsive-min.css";
import '@css/global.css';
import '@css/menu.css';

import { Lato } from '@next/font/google';
import Menu from '@app/menu';
import Image from 'next/image';
import Script from 'next/script';

const font = Lato({ subsets: ['latin'], weight: '400' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <Script>
        {`
          (function (window, document) {

            // we fetch the elements each time because docusaurus removes the previous
            // element references on page navigation
            function getElements() {
                return {
                    layout: document.getElementById('layout'),
                    menu: document.getElementById('menu'),
                    menuLink: document.getElementById('menuLink')
                };
            }
        
            function toggleClass(element, className) {
                var classes = element.className.split(/\s+/);
                var length = classes.length;
                var i = 0;
        
                for (; i < length; i++) {
                    if (classes[i] === className) {
                        classes.splice(i, 1);
                        break;
                    }
                }
                // The className is not found
                if (length === classes.length) {
                    classes.push(className);
                }
        
                element.className = classes.join(' ');
            }
        
            function toggleAll() {
                var active = 'active';
                var elements = getElements();
        
                toggleClass(elements.layout, active);
                toggleClass(elements.menu, active);
                toggleClass(elements.menuLink, active);
            }
            
            function handleEvent(e) {
                var elements = getElements();
                
                if (e.target.id === elements.menuLink.id) {
                    toggleAll();
                    e.preventDefault();
                } else if (elements.menu.className.indexOf('active') !== -1) {
                    toggleAll();
                }
            }
            
            document.addEventListener('click', handleEvent);
        
        }(this, this.document));
        `}
      </Script>
      <body>
        <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
            <span></span>
          </a>
          <Menu />
          <div id="main">{children}</div>
        </div>
      </body>
    </html>
  );
}
