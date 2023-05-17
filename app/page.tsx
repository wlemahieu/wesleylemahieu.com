'use client';

import '@css/styles.css';
import { Suspense, useRef, useState } from 'react';
import { Sky, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Camera from '@components/Camera';
import OrbitControls from '@components/OrbitControls';
import Overlay from '@components/Overlay';
import TopBar from '@components/TopBar';
import Scene from '@components/Scene';

useGLTF.preload('/models/astronaut.glb');

export default function App() {
  const overlay = useRef();
  const caption = useRef();
  const scrollState = useState(0);
  const soundState = useState('mute');

  return (
    <>
      <TopBar soundState={soundState} />
      <Canvas shadows style={{ height: '100vh' }}>
        <axesHelper args={[50]} visible={false} />
        <Camera scrollState={scrollState} />
        <ambientLight intensity={0.2} />
        <pointLight position={[200, 9, 500]} intensity={0.25} />
        <Sky sunPosition={[200, 9, 500]} turbidity={1} azimuth={50} rayleigh={3} />
        <Suspense fallback={null}>
          <Scene scrollState={scrollState} />
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} caption={caption} scrollState={scrollState} />
    </>
  );
}
