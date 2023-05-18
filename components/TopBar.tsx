'use client';

import useStateStore from '@hooks/useStateStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const TopBar = () => {
  const sound = useStateStore((state: any) => state.sound);
  const setSound = useStateStore((state: any) => state.setSound);

  const onSound = (action: string) => setSound(action);

  return (
    <div className="topbar">
      <ul
        style={{
          fontWeight: 'bold',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          zIndex: 1,
          columnGap: '1rem',
        }}
      >
        <li>
          <Link href="/Wesley LeMahieu's Resume.pdf" target="_blank" className="link">
            Resume
          </Link>
        </li>
        <li>
          <Link href="https://github.com/wlemahieu" target="_blank" className="link">
            GitHub
          </Link>
        </li>
        <li>
          <Link href="https://stackoverflow.com/users/904956/wesley-lemahieu" target="_blank" className="link">
            Stack
          </Link>
        </li>

        <li className="link">
          <Image
            src="/volume.png"
            priority
            alt="Disable sound"
            width={16}
            height={16}
            onClick={() => onSound('mute')}
            style={{ display: sound === 'play' ? 'inline-block' : 'none' }}
          />
          <Image
            src="/mute.png"
            priority
            alt="Enable sound"
            width={16}
            height={16}
            onClick={() => onSound('play')}
            style={{ display: sound === 'mute' ? 'inline-block' : 'none' }}
          />
        </li>
      </ul>
    </div>
  );
};

export default TopBar;
