import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import { headers } from 'next/headers';

const menuItems = ['About', 'Experience', 'Guides', 'Stackoverflow', 'Sandboxes', 'Contact'];

const hosts = ['localhost:3000', 'wesleylemahieu.com:443', 'wesleylemahieu-com-fooulzbuhq-uc.a.run.app:443'];

export default function Menu() {
  const headersList = headers();
  const host = headersList.get('host');
  console.log('### originalHost ###', host);
  const url =
    headersList
      .get('x-url')
      ?.replace('https://', '')
      .replace('http://', '')
      .replace(hosts[0], '')
      .replace(hosts[1], '') || '';
  const page = host ? url.replace(host, '') : null;

  return (
    <div id="menu">
      <div className="pure-menu">
        <Link className="pure-menu-heading" href="/">
          WL
        </Link>

        <ul className="pure-menu-list">
          {menuItems.map((item, key) => {
            const to = `/${kebabCase(item.toLowerCase())}`;
            const href = to === '/about' ? '/' : to;
            return (
              <li
                key={`item-${key}`}
                className={`pure-menu-item ${page === href ? `menu-item-divided pure-menu-selected` : ''}`}
              >
                <Link href={href} className="pure-menu-link" title={item}>
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
