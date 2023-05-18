'use client';

import Image from 'next/image';
import Link from 'next/link';

const TopBar = ({ soundState }: Partial<{ soundState: any }>) => {
  const [state, setState] = soundState;

  const onSound = (action: string) => {
    setState(action);
  };

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

        <li>
          {state === 'play' ? (
            <Image
              src="/volume.png"
              priority
              alt="Disable sound"
              width={16}
              height={16}
              onClick={() => onSound('mute')}
            />
          ) : null}
          {state === 'mute' ? (
            <Image src="/mute.png" priority alt="Enable sound" width={16} height={16} onClick={() => onSound('play')} />
          ) : null}
        </li>
      </ul>
    </div>
  );
};

export default TopBar;
