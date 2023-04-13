import * as THREE from 'three';
import { useRef, useLayoutEffect } from 'react';
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
  const { camera } = useThree();

  const controls = usePlayerControls(currentAction);
  // console.log('camera controls', controls);

  useLayoutEffect(() => {
    // console.log('direction', direction);
  }, [direction]);

  useFrame(() => {
    if (camera) {
      camera.getWorldDirection(direction);
    }
    //console.log('direction', direction);
  });

  return (
    <PerspectiveCamera
      fov={50}
      position={[0, 15, 0]}
      rotation={[0, 0, Math.PI / 3]}
      aspect={window.innerWidth / window.innerHeight}
      near={1}
      far={1000}
    />
  );
};

export default Camera;
