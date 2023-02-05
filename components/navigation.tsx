import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import { headers } from 'next/headers';
import styles from './navigation.module.css';

const menuItems = [
  'About',
  'Experience',
  'Portfolio',
  'Contact'
];

const Navigation = () => {
  const headersList = headers();
  const host = headersList.get('host');
  const url = headersList.get('x-url')?.replace('https://', '').replace('http://', '') || "";
  const page = host ? url.replace(host, '') : null;

  return (
    <nav className={styles.root}>
      <div className={styles.menuWrapper}>
        <ul className={styles.menuList}>
          {menuItems.map((item, key) => {
            const to = `/${kebabCase(item.toLowerCase())}`;
            const href = to === '/about' ? '/' : to;
            return (
              <li key={`item-${key}`} className={page === href ? styles.activeItem : undefined}>
                <Link href={href} className="text-lg font-semibold">{item}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  )
};

export default Navigation;