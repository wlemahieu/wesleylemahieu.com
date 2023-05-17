'use client';

import '@css/styles.css';
import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useAnimations, SpotLight, useVideoTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
      console.log('Start music and waves...');
      audioLoader.load('music.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setPlaybackRate(0.75);
        sound.setVolume(0.2);
        sound.play();
      });

      audioLoader2.load('waves.mp3', function (buffer) {
        sound2.setBuffer(buffer);
        sound2.setLoop(true);
        sound2.setVolume(0.3);
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

export default Dev;
