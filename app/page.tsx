'use client';

import '@css/styles.css';
import { Suspense, useRef, useState } from 'react';
import { Html, Sky, useGLTF, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Camera from '@components/Camera';
import Overlay from '@components/Overlay';
import TopBar from '@components/TopBar';
import Scene from '@components/Scene';

useGLTF.preload('/models/astronaut.glb');

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html center>
      <h2>Loading...</h2>
      <h1>{Math.round(progress)}%</h1>
    </Html>
  );
}

export default function App() {
  const overlay = useRef();
  const scrollState = useState(0);
  const soundState = useState('mute');
  const { progress } = useProgress();

  return (
    <>
      <Canvas shadows style={{ height: '100vh' }}>
        <axesHelper args={[50]} visible={false} />
        <Camera scrollState={scrollState} />
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.2} />
          <pointLight position={[200, 9, 500]} intensity={0.25} />
          <Sky sunPosition={[200, 9, 500]} turbidity={1} azimuth={50} rayleigh={3} />
          <Scene scrollState={scrollState} soundState={soundState} />
        </Suspense>
      </Canvas>
      {progress === 100 ? (
        <>
          <TopBar soundState={soundState} />
          <Overlay ref={overlay} scrollState={scrollState} soundState={soundState} />
        </>
      ) : null}
    </>
  );
}
