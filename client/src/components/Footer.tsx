import styles from '@components/Footer.module.css';
import cloudflare from '@assets/cloudflare.svg';
import gcp from '@assets/gcp.svg';
import { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { A } from '@solidjs/router';
import Link from '@suid/material/Link';

const Footer: Component = () => {
  const navigate = useNavigate();

  const goToTerms = () => navigate('/terms');
  const goToPrivacy = () => navigate('/privacy');

  return (
    <footer class={styles.root}>
      <ul class={styles.list}>
        <li>
          <Link onClick={goToTerms}>Terms of Use</Link>
        </li>
        <li>
          <Link onClick={goToPrivacy}>Privacy Policy</Link>
        </li>
      </ul>
      <div class={styles.brandWrapper}>
        <div class={styles.brand}>
          Protected by&nbsp;
          <A href="https://cloudflare.com/" target="_blank" rel="noreferrer">
            <img src={cloudflare} class={styles.cloudflare} />
          </A>
        </div>
        <div class={styles.brand}>
          Powered by&nbsp;
          <A href="https://cloud.google.com" target="_blank" rel="noreferrer">
            <img src={gcp} class={styles.gcp} />
          </A>
        </div>
      </div>
      <div class={styles.legal}>© 2022 Pugs, LLC. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
