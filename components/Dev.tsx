'use client';

import '@css/styles.css';
import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { useAnimations, SpotLight, useVideoTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import useStateStore from '@hooks/useStateStore';

const Dev = () => {
  const scroll = useStateStore((state: any) => state.scroll);
  const sound = useStateStore((state: any) => state.sound);
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
  const [music] = useState(new Audio('/music.mov'));
  const [waves] = useState(new Audio('/waves.mp3'));
  const [working] = useState(new Audio('/WesTypingClicking.mp3'));

  const animate: any = {
    StandingIdle: () => {
      animations.actions.StandingIdle.play();
      setAction('StandingIdle');
    },
    StandToSit: () => {
      if (!started) {
        setStarted(true);
        animations.actions.StandingIdle.crossFadeTo(animations.actions.Typing, 0.4, false);
        // animations.actions.Typing.setLoop(THREE.LoopOnce);
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
    document.addEventListener('visibilitychange', visChngF);
    function visChngF() {
      if (document.hidden) {
        stopSounds();
      } else {
        startSounds();
      }
    }
    return () => {
      document.removeEventListener('visibilitychange', visChngF);
    };
  }, [sound]);

  const startSounds = () => {
    if (sound === 'play') {
      music.loop = true;
      music.volume = 0.15;
      music.play();

      waves.loop = true;
      waves.volume = 0.3;
      waves.play();

      working.loop = true;
      working.volume = 0.1;
      working.play();
    }
  };

  const stopSounds = () => {
    music.pause();
    waves.pause();
    working.pause();
  };

  const startAnimations = () => {
    animate.StandToSit();
  };

  useEffect(() => {
    animate.StandingIdle();
    // also a 'loop' listener
    animations.mixer.addEventListener('finished', (e: any) => {
      // console.log('Loop finished!', e);
      /*
      if (e.action._clip.name === 'Typing') {
        sound3.stop();
      }*/
    });
  }, []);

  useEffect(() => {
    if (sound === 'mute') {
      if (init) {
        stopSounds();
      }
    } else if (sound === 'play') {
      setInit(true);
      startSounds();
      startAnimations();
    }
  }, [sound]);

  useFrame((state, delta) => {
    group.current.position.y = Math.cos(state.clock.elapsedTime) * 0.42;
    group.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.05;
    spotlight.current.target = devHead.current; // keep spotlight tracked on dev head.
  });

  useEffect(() => {
    if (scroll > 0 && !init) {
      setInit(true);
      startAnimations();
    }
  }, [scroll]);

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
