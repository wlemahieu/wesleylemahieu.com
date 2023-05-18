import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { PerspectiveCamera, useHelper } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import useStateStore from '@hooks/useStateStore';

const direction = new THREE.Vector3(0, 0, 0);
const center = new THREE.Vector3(0, 3, 0);
const q1 = new THREE.Quaternion(0.01563719112964619, 0.975436403607336, 0.07368579800555208, -0.20700170033950538);
const q2 = new THREE.Quaternion(-0.0736857980055521, 0.20700170033950527, 0.015637191129646184, 0.9754364036073361);
const q3 = new THREE.Quaternion();

const dummy = new THREE.Vector3();
const lookAtPos = new THREE.Vector3();

const Camera: React.FC<any> = () => {
  const scroll = useStateStore((state: any) => state.scroll);
  const [prevScroll, setPrevScroll] = useState(scroll);
  const ref = useRef<any>(null);
  const set = useThree((state) => state.set);
  const lerpStep = 0.033;

  useHelper(ref.current, THREE.CameraHelper);

  // set the default camera
  useEffect(() => {
    set({ camera: ref.current });
  }, []);

  useEffect(() => {
    // console.log({ scroll, prevScroll });
    if (scroll !== prevScroll) {
      setPrevScroll(scroll);
    }
  }, [scroll, prevScroll]);

  useFrame((state, delta) => {
    if (scroll >= 0.4 && scroll < 0.9) {
      state.camera.position.lerp(dummy.set(-40, 20, 20), lerpStep);
    } else if (scroll >= 0.9) {
      state.camera.position.lerp(dummy.set(160, 30, 160), lerpStep);
    } else {
      // original position
      // state.camera.set

      // HREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, step)
      state.camera.position.lerp(dummy.set(-20, 8, -45), lerpStep);
    }
    //state.camera.position.lerp(dummy.set(-20, newY, Math.max(scroll * destZ, origZ)), lerpStep);
    state.camera.lookAt(0, 4, 0);
    state.camera.updateProjectionMatrix();
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={ref}
        fov={20}
        //position={[-20, 0, -45]}
        position={[-20, 8, -45]}
        aspect={window.innerWidth / window.innerHeight}
        near={1}
        far={1000}
      />
    </>
  );
};

export default Camera;
