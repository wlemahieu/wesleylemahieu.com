'use client';

import Rocket from '@components/Rocket';
import Ocean from '@components/Ocean';
import Dev from '@components/Dev';

interface PropsI {
  caption: any;
  scrollState: any;
}

const Scene = ({ scrollState }: Partial<PropsI>) => {
  const [scroll] = scrollState;
  return (
    <>
      <Dev scroll={scroll} />
      <Rocket />
      <Ocean />
    </>
  );
};

export default Scene;
