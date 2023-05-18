'use client';

import '@css/styles.css';
import { Suspense } from 'react';
import { Sky, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Camera from '@components/Camera';
import Overlay from '@components/Overlay';
import Scene from '@components/Scene';
import Loader from '@components/Loader';

useGLTF.preload('/models/astronaut.glb');

export default function App() {
  return (
    <>
      <Canvas shadows style={{ height: '100vh' }}>
        <axesHelper args={[50]} visible={false} />
        <Camera />
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.2} />
          <pointLight position={[200, 9, 500]} intensity={0.25} />
          <Sky sunPosition={[200, 9, 500]} turbidity={1} azimuth={50} rayleigh={3} />
          <Scene />
        </Suspense>
      </Canvas>
      <Overlay />
    </>
  );
}
