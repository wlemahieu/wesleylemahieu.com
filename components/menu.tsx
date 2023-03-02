import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import { headers } from 'next/headers';
import styles from './navigation.module.css';

const menuItems = ['About', 'Experience', 'Portfolio', 'Guides', 'Stackoverflow', 'Sandboxes', 'Contact'];

const hosts = ['localhost:3000', 'wesleylemahieu.com:443'];

const Menu = () => {
  const headersList = headers();
  const host = headersList.get('host');
  const url =
    headersList
      .get('x-url')
      ?.replace('https://', '')
      .replace('http://', '')
      .replace(hosts[0], '')
      .replace(hosts[1], '') || '';
  const page = host ? url.replace(host, '') : null;

  return (
    <ul className="container flex flex-wrap items-center justify-center gap-x-10 mx-auto">
      {menuItems.map((item, key) => {
        const to = `/${kebabCase(item.toLowerCase())}`;
        const href = to === '/about' ? '/' : to;
        return (
          <li key={`item-${key}`} className={page === href ? styles.activeItem : undefined}>
            <Link href={href} className="text-lg font-semibold" title={item}>
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
