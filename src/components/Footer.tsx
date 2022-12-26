import React from 'react';
import styles from './Footer.module.css';
import cloudflare from '../assets/cloudflare.svg';
import gcp from '../assets/gcp.svg';

const Footer = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.brandWrapper}>
        <div className={styles.brand}>
          Protected by&nbsp;
          <a href="https://cloudflare.com/" target="_blank" rel="external nofollow noopener">
            <img src={cloudflare as any} className={styles.cloudflare} />
          </a>
        </div>
        <div className={styles.brand}>
          Powered by&nbsp;
          <a href="https://cloud.google.com" target="_blank" rel="external nofollow noopener">
            <img src={gcp as any} className={styles.gcp} />
          </a>
        </div>
      </div>
      <div className={styles.legal}>© 2022 Pugs, LLC. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
