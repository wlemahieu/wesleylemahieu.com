'use client';

// https://coolors.co/7a5c61-f7accf-e8f0ff-6874e8-392759
// rose taupe 7a5c61
// lavendar pink f7accf
// alice blue e8f0ff
// medium slate blue 6874e8
// russian violet 392759

import * as THREE from 'three';
import { useRef, useMemo, useEffect, useState } from 'react';
import {
  Html,
  useAnimations,
  Cloud,
  ScrollControls,
  Sky,
  SpotLight,
  useVideoTexture,
  useScroll,
} from '@react-three/drei';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import '@css/styles.css';
import Link from 'next/link';
import { Suspense } from 'react';
import Camera from '@helpers/Camera';
import useIsMobile from '@hooks/useIsMobile';
import { OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Water } from 'three-stdlib';

extend({ Water });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: any;
    }
  }
}

const ContactForm = () => {
  const { viewport, gl } = useThree();
  const isMobile = useIsMobile();

  const htmlRotation: any = [0.1, 0.4, 0.05];
  const htmlScale: any = isMobile ? [0.8, 0.8, 0.8] : [1, 1, 1];
  const boxArgs: any = isMobile ? [2, 2, 2] : [3, 3, 3];

  return (
    <mesh castShadow rotation={[0, 0, 0]} position={[0, -viewport.height * 5.5, -5]}>
      <boxGeometry args={boxArgs} />
      <meshStandardMaterial color="red" transparent opacity={0.5} />

      <Html scale={htmlScale} transform portal={{ current: gl.domElement.parentNode as any }} rotation={htmlRotation}>
        <form
          action="/api/contact"
          method="post"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            rowGap: '.5rem',
          }}
        >
          <input name="name" placeholder="Name" required />
          <input name="email" placeholder="Email" required />
          <textarea name="inquiry" placeholder="Inquiry" style={{ resize: 'none' }} required />
          <button type="submit">Submit</button>
        </form>
      </Html>
    </mesh>
  );
};

const Overlay = () => {
  return (
    <div
      style={{
        fontSize: '17px',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '25px',
        paddingTop: '14px',
        display: 'flex',
        columnGap: 2,
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <ul
        style={{
          fontWeight: 'bold',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          zIndex: 1,
          columnGap: '1rem',
          opacity: 0.75,
        }}
      >
        <li>
          <Link href="/Wesley LeMahieu's Resume.pdf" target="_blank" className="link">
            Resume
          </Link>
        </li>
        <li>
          <Link href="https://github.com/wlemahieu" target="_blank" className="link">
            GitHub
          </Link>
        </li>
        <li>
          <Link href="https://stackoverflow.com/users/904956/wesley-lemahieu" target="_blank" className="link">
            Stack
          </Link>
        </li>
        {/*
        <li>&#9658;</li>
      <li>&#9208;</li>*/}
      </ul>
    </div>
  );
};

const Scene2 = () => {
  return (
    <>
      <Dev />
      <Rocket />
      <OceanW />
    </>
  );
};

const Dev = () => {
  const [started, setStarted] = useState(false);
  const boat = useLoader(FBXLoader, '/models/Wood_BoatV2.fbx');
  const paddle = useLoader(FBXLoader, '/models/Paddle.fbx');
  const macbook = useLoader(FBXLoader, '/models/macbook.fbx');
  const dev = useLoader(GLTFLoader, '/models/astronaut.glb');
  const group = useRef<any>();
  const spotlight = useRef<any>();
  const devHead = useRef<any>();
  const devRef = useRef<any>();
  const animations = useAnimations(dev.animations, group) as Record<string, any>;
  const [action, setAction] = useState('StandingIdle');
  const [prevAction, setPrevAction] = useState('');
  const texture = useVideoTexture('/coding.mp4', { start: started });
  const scroll = useScroll();

  const listener3 = new THREE.AudioListener();
  const sound3 = new THREE.Audio(listener3);
  const audioLoader3 = new THREE.AudioLoader();
  // console.log('scroll', scroll);
  const animate: any = {
    StandingIdle: () => {
      animations.actions.StandingIdle.play();
      setAction('StandingIdle');
    },
    StandToSit: () => {
      if (!started) {
        setStarted(true);
        animations.actions.StandingIdle.crossFadeTo(animations.actions.Typing, 0.4, false);
        animations.actions.Typing.setLoop(THREE.LoopOnce);
        audioLoader3.load('WesTypingClicking.mp3', function (buffer) {
          sound3.setBuffer(buffer);
          sound3.setLoop(true);
          sound3.setVolume(0.1);
          sound3.play();
        });
        animations.actions.Typing.play();
        //animations.actions.Typing.crossFadeTo(animations.actions.StandingIdle, 0.75, false);
        //animations.actions.StandingIdle.play();
        devHead.current.position.set(0, 3, -2); // slide the head ref block down (for better glow)
        // animations.actions.Typing.crossFadeTo(animations.actions.Typing, 1, false);
        //setPrevAction('StandingIdle');
        //setAction('StandToSit');
      }
    },
    Typing: () => {
      setTimeout(() => {
        animations.actions.StandingIdle.play();
      });
    },
  };

  useEffect(() => {
    animate.StandingIdle();
    // also a 'loop' listener
    animations.mixer.addEventListener('finished', (e: any) => {
      // console.log('Loop finished!', e);
      if (e.action._clip.name === 'Typing') {
        sound3.stop();
      }
    });
  }, []);

  useFrame((state, delta) => {
    group.current.position.y = Math.cos(state.clock.elapsedTime) * 0.42;
    group.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.05;
    spotlight.current.target = devHead.current; // keep spotlight tracked on dev head.
  });

  const onClickDev = () => {
    animate.StandToSit();
  };

  return (
    <group ref={group} onClick={onClickDev}>
      {/* Astronaut dev head reference (for glow light)*/}
      <mesh ref={devHead} receiveShadow position={[0, 5, -2]}>
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial opacity={0} transparent />
      </mesh>
      {/* Astronaut dev */}
      <primitive ref={devRef} object={dev.scene} scale={150} position={[0, 1.55, -1.85]} />
      {/* Paddle desk */}
      <primitive object={paddle} scale={0.05} position={[-1.5, 2.75, 0.25]} rotation={[0, Math.PI / 2, 0]} />
      {/* Laptop glow */}
      <SpotLight
        castShadow
        ref={spotlight}
        color="blue"
        position={[0.1, 4, 1.9]}
        penumbra={3}
        distance={4}
        attenuation={0.01}
        anglePower={5}
        intensity={3}
        target={devHead.current}
      />
      {/* Matrix mp4 */}
      <mesh scale={5} position={[0.1, 3.91, 1.92]} rotation={[Math.PI / 12, 0, 0]}>
        <boxGeometry attach="geometry" args={[0.55, 0.4, 0.01]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* Laptop */}
      <primitive object={macbook} scale={0.015} position={[-2.75, 3.9, -3]} rotation={[0, 2.63, 0]} />
      {/* Row boat */}
      <primitive object={boat} scale={0.05} position={[0, -1.5, 0]} />
    </group>
  );
};

const Rocket = () => {
  const rocket = useLoader(GLTFLoader, '/models/rocket.glb');
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

const OceanW = () => {
  const ref = useRef() as any;
  const gl = useThree((state) => state.gl) as any;
  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg');
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals],
  );
  const listener = new THREE.AudioListener();
  const sound = new THREE.Audio(listener);
  const audioLoader = new THREE.AudioLoader();

  const listener2 = new THREE.AudioListener();
  const sound2 = new THREE.Audio(listener2);
  const audioLoader2 = new THREE.AudioLoader();

  const onClickMesh = () => {
    audioLoader.load('music.mp3', function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setPlaybackRate(0.75);
      sound.setVolume(0.05);
      sound.play();
    });

    audioLoader2.load('waves.mp3', function (buffer) {
      sound2.setBuffer(buffer);
      sound2.setLoop(true);
      sound2.setVolume(0.1);
      sound2.play();
    });
  };

  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta));
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} onPointerDown={onClickMesh} />;
};

export default function App() {
  const onMove = (e: any) => {
    // console.log(e);
  };

  const orbitOpts = {
    autoRotate: false,
    autoRotateSpeed: -0.42,
    enablePan: false,
    enableRotate: false,
    screenSpacePanning: false,
    distance: 70,
    maxDistance: 70,
    minDistance: 70,
    angle: 1.42,
    minPolarAngle: 1.42,
    maxPolarAngle: 1.42,
  };

  return (
    <>
      <Overlay />
      <Canvas style={{ height: '100vh' }} onMouseMove={onMove} shadows>
        <ambientLight intensity={0.1} />
        <OrbitControls {...orbitOpts} />
        <pointLight position={[200, 9, 500]} intensity={0.25} />
        <Sky sunPosition={[200, 9, 500]} turbidity={1} azimuth={50} rayleigh={3} />
        <axesHelper args={[50]} />
        <Camera />
        <Suspense fallback={null}>
          <ScrollControls pages={2}>
            <Scene2 />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  );
}
