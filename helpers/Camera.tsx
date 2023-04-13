import * as THREE from 'three';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import usePlayerControls from './usePlayerControls';

const cameraPosition = new THREE.Vector3();
const cameraLookat = new THREE.Vector3();
const direction = new THREE.Vector3();

/*
camera={{
fov: 50,
position: [0, 15, 0],
rotation: [0, 0, Math.PI / 3],
aspect: window.innerWidth / window.innerHeight,
near: 1,
far: 1000,
}}*/

const Camera: React.FC = (props: any) => {
  const currentAction: any = useRef();
  const ref = useRef<any>(null);
  const set = useThree((state) => state.set);
  const { camera } = useThree();
  const [matches, setMatches] = useState(false);

  useFrame(() => ref.current.updateMatrixWorld());
  useEffect(() => {
    set({ camera: ref.current });
    setMatches(window.matchMedia('(min-width: 768px)').matches);
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
      console.log('e', e);
      setMatches(e.matches);
      camera.updateProjectionMatrix();
    });
  }, []);

  const controls = usePlayerControls(currentAction);
  console.log({ camera, matches, controls });

  return <PerspectiveCamera ref={ref} fov={60} position={[0, 0, matches ? 5 : 10]} near={1} far={10000} />;
};

export default Camera;
