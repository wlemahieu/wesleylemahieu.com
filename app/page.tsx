'use client';

// https://coolors.co/7a5c61-f7accf-e8f0ff-6874e8-392759
// rose taupe 7a5c61
// lavendar pink f7accf
// alice blue e8f0ff
// medium slate blue 6874e8
// russian violet 392759

import * as THREE from 'three';
import { useRef, useMemo, useEffect, useState } from 'react';
import { Html, useAnimations, Sky, SpotLight, useVideoTexture, useGLTF } from '@react-three/drei';
import { Canvas, Props, extend, useFrame, useThree } from '@react-three/fiber';
import '@css/styles.css';
import { Suspense } from 'react';
import Camera from '@helpers/Camera';
import useIsMobile from '@hooks/useIsMobile';
import { OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Water } from 'three-stdlib';

extend({ Water });

useGLTF.preload('/models/astronaut.glb');

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

const TopBar = ({ soundState }: Partial<{ soundState: any }>) => {
  const [state, setState] = soundState;

  const onSound = (action: string) => {
    setState(action);
  };

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
        <li>
          {state === 'play' ? (
            <Image src="/volume.png" alt="Disable sound" width={24} height={24} onClick={() => onSound('mute')} />
          ) : null}
          {state === 'mute' ? (
            <Image src="/mute.png" alt="Enable sound" width={24} height={24} onClick={() => onSound('play')} />
          ) : null}
        </li>
          */}
      </ul>
    </div>
  );
};

const Scene2 = ({ scrollState }: Partial<PropsI>) => {
  const [scroll] = scrollState;
  return (
    <>
      <Dev scroll={scroll} />
      <Rocket />
      <OceanW />
    </>
  );
};

import React, { forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PropsI {
  caption: any;
  scrollState: any;
}

// eslint-disable-next-line react/display-name
const Overlay = forwardRef((props: PropsI, ref: any) => {
  const { caption, scrollState } = props;

  const [scroll, setScroll] = scrollState;

  const onScroll = (e: any) => {
    setScroll(e.target.scrollTop / (e.target.scrollHeight - window.innerHeight));
    if (caption.current) {
      caption.current.innerText = scroll.toFixed(2);
    }
  };

  return (
    <div ref={ref} onScroll={onScroll} className="scroll">
      <div style={{ height: '100vh' }}>
        <div className="dot">
          <h1>Hello.</h1>
          <h2>My name is Wesley.</h2>
          <p>I'm passionate about user experience.</p>
        </div>
      </div>
      <div style={{ height: '100vh' }}></div>
      {/* 
      <span className="caption" ref={caption}>
        0.00
      </span>
      */}
    </div>
  );
});

const Dev = ({ scroll }: { scroll: number }) => {
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
  const [init, setInit] = useState(false);
  const listener3 = new THREE.AudioListener();
  const sound3 = new THREE.Audio(listener3);
  const audioLoader3 = new THREE.AudioLoader();
  const listener = new THREE.AudioListener();
  const sound = new THREE.Audio(listener) as any;
  const audioLoader = new THREE.AudioLoader();

  const listener2 = new THREE.AudioListener();
  const sound2 = new THREE.Audio(listener2);
  const audioLoader2 = new THREE.AudioLoader();

  // console.log({ scroll, sound, sound2, audioLoader });

  const onSound = (action: string) => {
    if (action === 'mute') {
      sound.setVolume(0);
      sound2.setVolume(0);
    } else if (action === 'play') {
      audioLoader.load('music.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setPlaybackRate(0.75);
        sound.setVolume(0.15);
        sound.play();
      });

      audioLoader2.load('waves.mp3', function (buffer) {
        sound2.setBuffer(buffer);
        sound2.setLoop(true);
        sound2.setVolume(0.25);
        sound2.play();
      });
    }
  };

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
          sound3.setVolume(0.2);
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
    // lerp new camera position on scroll
    // original position [-20, 80, -45]
    /*
    const originalX = -27.70;
    const lerpToX = scroll ? 20 * scroll : originalX;
    const newXpos = THREE.MathUtils.lerp(state.camera.position.x, lerpToX, 0.05);
    console.log({ scroll, newXpos, camera: state.camera.position });
    state.camera.position.set(newXpos, state.camera.position.y, state.camera.position.z);
    */
    // state.camera.rotation.set(0, Math.PI / 2, Math.PI / 8);
  });

  useEffect(() => {
    if (!init && scroll > 0) {
      audioLoader.load('music.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setPlaybackRate(0.75);
        sound.setVolume(0.15);
        sound.play();
      });

      audioLoader2.load('waves.mp3', function (buffer) {
        sound2.setBuffer(buffer);
        sound2.setLoop(true);
        sound2.setVolume(0.25);
        sound2.play();
      });
      setInit(true);
      animate.StandToSit();
    }
  }, [scroll, init]);

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

  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta));
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
};

export default function App() {
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

  const overlay = useRef();
  const caption = useRef();
  const scrollState = useState(0);
  const soundState = useState('mute');

  return (
    <>
      <TopBar soundState={soundState} />
      <Canvas shadows style={{ height: '100vh' }}>
        <ambientLight intensity={0.2} />
        <OrbitControls {...orbitOpts} />
        <pointLight position={[200, 9, 500]} intensity={0.25} />
        <Sky sunPosition={[200, 9, 500]} turbidity={1} azimuth={50} rayleigh={3} />
        <axesHelper args={[50]} visible={false} />
        <Camera />
        <Suspense fallback={null}>
          <Scene2 scrollState={scrollState} />
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} caption={caption} scrollState={scrollState} />
    </>
  );
}
