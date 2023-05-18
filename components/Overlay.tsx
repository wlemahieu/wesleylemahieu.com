'use client';

import { useRef } from 'react';
import TopBar from './TopBar';
import { useProgress } from '@react-three/drei';
import useStateStore from '@hooks/useStateStore';

const Overlay = () => {
  const ref = useRef() as any;
  const { progress } = useProgress();
  const setScroll = useStateStore((state: any) => state.setScroll);
  const setSound = useStateStore((state: any) => state.setSound);

  const onClickScreen = () => {
    setSound('play');
  };

  const onScroll = (e: any) => {
    setScroll(e.target.scrollTop / (e.target.scrollHeight - window.innerHeight));
  };

  return (
    <>
      {progress === 100 ? (
        <>
          <TopBar />
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
        </>
      ) : null}
    </>
  );
};

export default Overlay;
