/**
 * Global site menu navigation
 */
import styles from '@components/Navigation.module.css';
import { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Link from '@suid/material/Link';

const Navigation: Component = () => {
  const navigate = useNavigate();

  return (
    <nav class={styles.root}>
      <ul class={styles.list}>
        <li>
          <Link onClick={() => navigate('/about')}>About</Link>
        </li>
        <li>
          <Link onClick={() => navigate('/contact')}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
