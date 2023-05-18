'use client';

import Rocket from '@components/Rocket';
import Ocean from '@components/Ocean';
import Dev from '@components/Dev';

interface PropsI {
  caption: any;
  scrollState: any;
  soundState: any;
}

const Scene = ({ scrollState, soundState }: Partial<PropsI>) => {
  const [scroll] = scrollState;
  const [sound] = soundState;
  return (
    <>
      <Dev scroll={scroll} sound={sound} />
      <Rocket />
      <Ocean />
    </>
  );
};

export default Scene;
