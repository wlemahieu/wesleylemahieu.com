'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Rocket = () => {
  const rocket = useLoader(GLTFLoader, '/models/rocket.glb');
  //console.log('rocket', rocket);
  const group = useRef<any>();

  useFrame((state, delta) => {
    group.current.position.y = Math.cos(state.clock.elapsedTime) * 0.5;
    group.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.1;
    group.current.rotation.y += 0.1;
  });

  return (
    <group ref={group} position={[50, 0, 50]} rotation={[Math.PI / 2, Math.PI / 8, 0]}>
      <primitive object={rocket.scene} scale={2} />
    </group>
  );
};

export default Rocket;
