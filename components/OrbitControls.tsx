'use client';

import { OrbitControls as DreiOrbitControls } from '@react-three/drei';

const orbitOpts = {
  autoRotate: false,
  autoRotateSpeed: -0.42,
  enablePan: false,
  enableRotate: true,
  screenSpacePanning: false,
  distance: 70,
  maxDistance: 70,
  minDistance: 70,
  angle: 1.42,
  minPolarAngle: 1.42,
  maxPolarAngle: 1.42,
};

export default function OrbitControls() {
  return <DreiOrbitControls {...orbitOpts} />;
}
