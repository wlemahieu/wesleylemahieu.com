'use client';

import Link from 'next/link';
import { forwardRef } from 'react';

interface PropsI {
  caption: any;
  scrollState: any;
}

// eslint-disable-next-line react/display-name
const Overlay = forwardRef((props: PropsI, ref: any) => {
  const { caption, scrollState } = props;

  const [scroll, setScroll] = scrollState;

  const onScroll = (e: any) => {
    setScroll(e.target.scrollTop / (e.target.scrollHeight - window.innerHeight));
    if (caption.current) {
      caption.current.innerText = scroll.toFixed(2);
    }
  };

  return (
    <div ref={ref} onScroll={onScroll} className="scroll">
      <div style={{ height: '100vh' }}>
        <div className="dot">
          <h1>Hello.</h1>
          <h2>My name is Wesley.</h2>
          <p>I'm passionate about user experience.</p>
        </div>
      </div>
      <div style={{ height: '100vh' }}>
        <div className="dot">
          <h1>Technical Skills.</h1>
          <p>Next.js, React.js, Three.js, MySQL, GCP</p>
        </div>
      </div>
      <div style={{ height: '100vh' }}>
        <div className="dot">
          <h1>Accomplishments</h1>
          <ul>
            <li>Key role in 3 successful start-ups</li>
            <li>Silver Stevie Award</li>
            <li>Certified ScrumMaster</li>
          </ul>
        </div>
      </div>
      {/** 
      <span className="caption" ref={caption}>
        0.00
      </span>
      */}
    </div>
  );
});

export default Overlay;
