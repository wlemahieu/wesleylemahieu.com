import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { PerspectiveCamera, useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import usePlayerControls from './usePlayerControls';
import useIsMobile from '@hooks/useIsMobile';

const cameraPosition = new THREE.Vector3();
const cameraLookat = new THREE.Vector3();
const direction = new THREE.Vector3();

const Camera: React.FC<any> = (props: any) => {
  const currentAction: any = useRef();
  const ref = useRef<any>(null);
  const set = useThree((state) => state.set);
  const isMobile = useIsMobile();

  useHelper(ref.current, THREE.CameraHelper);

  const getZ = () => {
    if (typeof isMobile === 'undefined') {
      return 5;
    } else if (!isMobile) {
      return 5;
    } else {
      return 10;
    }
  };

  useEffect(() => {
    set({ camera: ref.current });
  }, []);

  const controls = usePlayerControls(currentAction);

  return (
    <PerspectiveCamera
      makeDefault
      ref={ref}
      fov={20}
      position={[-20, 80, 30]}
      aspect={window.innerWidth / window.innerHeight}
      near={1}
      far={1000}
    />
  );
};

export default Camera;
