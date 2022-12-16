import { Component } from 'solid-js';
import styles from '@components/Header.module.css';
import Typography from '@suid/material/Typography';

const Header: Component = () => {
  return (
    <header class={styles.root}>
      <Typography variant="h3" gutterBottom>
        wesleylemahieu.com
      </Typography>
    </header>
  );
};

export default Header;
