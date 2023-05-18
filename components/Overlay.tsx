'use client';

import { forwardRef } from 'react';

interface PropsI {
  scrollState: any;
  soundState: any;
}

// eslint-disable-next-line react/display-name
const Overlay = forwardRef((props: PropsI, ref: any) => {
  const { scrollState, soundState } = props;
  const [, setSoundState] = soundState;
  const onClickScreen = () => {
    setSoundState('play');
  };
  const [, setScroll] = scrollState;

  const onScroll = (e: any) => {
    setScroll(e.target.scrollTop / (e.target.scrollHeight - window.innerHeight));
  };
  return (
    <div ref={ref} onScroll={onScroll} className="scroll" onMouseDown={onClickScreen}>
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
    </div>
  );
});

export default Overlay;
