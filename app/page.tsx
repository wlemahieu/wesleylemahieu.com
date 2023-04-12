'use client';

// https://coolors.co/7a5c61-f7accf-e8f0ff-6874e8-392759

import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Scroll, ScrollControls, Text } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import '@css/styles.css';
import Link from 'next/link';

interface BoxPropsI {
  page: number;
  text?: any;
  color?: any;
  position?: any;
}

interface WordPropsI {
  children: any;
  position?: any;
}

function Word({ children, ...props }: WordPropsI) {
  const color = new THREE.Color();
  const fontProps = {
    font: '/Inter-Bold.woff',
    fontSize: 2,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false,
  };
  const ref = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const over = (e: any) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);
  // Change the mouse cursor on hover
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    if (ref.current) {
      // Make text face the camera
      // ref.current.quaternion.copy(camera.quaternion);
      ref.current.lookAt(camera.position);
      // Animate font color
      ref.current.material.color.lerp(color.set(hovered ? '#F7ACCF' : 'black'), 0.1);
    }
  });
  return (
    <Text
      ref={ref}
      onPointerOver={over}
      onPointerOut={out}
      onClick={() => console.log('clicked')}
      {...props}
      {...fontProps}
    >
      {children}
    </Text>
  );
}

const originalSkills = [
  'Typescript',
  'Next.js',
  'React.js',
  'GCP',
  'GCR',
  'GCF',
  'GAE',
  'Three.js',
  'R3F',
  'Node.js',
  'Express.js',
  'MySQL',
  'PgSQL',
  'MongoDB',
  'NoSQL',
  'Firestore',
  'VSCode',
  'MUI',
  'AntD',
  'CSS',
  'HTML',
  'Jest',
  'Mocha',
  'Chai',
  'Sinon',
  'REST',
  'OAuth',
  'CI/CD',
  'Git',
  'DNS',
  'Redux.js',
  'Redis',
  'Websockets',
  'Socket.io',
  'SEO',
  'JIRA',
];

function SkillPlanet({ count = 6, radius = 20 }) {
  let skills = [...originalSkills];

  const pickWord = () => {
    const pick = [...skills][0];
    skills = skills.filter((s) => s !== pick);
    return pick || 'foobar';
  };

  const viewport = useThree((state) => state.viewport);
  const ref = useRef<any>(null);
  const [hovering, setHovering] = useState(false);

  // Create a count x count random words with spherical distribution
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++)
        temp.push([
          new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)),
          pickWord(),
        ]);
    return temp;
  }, [count, radius]);

  useFrame((f, d) => {
    if (ref.current) {
      const r = Math.PI / (360 * 6);
      // console.log({ hovering });
      if (!hovering) {
        ref.current.rotation.x += r;
        ref.current.rotation.y += r;
        ref.current.rotation.z += r;
      }
    }
  });

  return (
    <group
      ref={ref}
      scale={[0.175, 0.175, 0.175]}
      position={[0, -viewport.height * 4, -5]}
      onPointerOver={(e) => setHovering(true)}
      onPointerOut={(e) => setHovering(false)}
    >
      <mesh>
        <sphereGeometry args={[15, 32, 16]} />
        <meshStandardMaterial transparent color="#392759" opacity={0.25} />
        {words.map(([pos, word], index) => (
          <Word key={index} position={pos}>
            {word}
          </Word>
        ))}
      </mesh>
    </group>
  );
}

function TechStackText() {
  const viewport = useThree((state) => state.viewport);

  return (
    <Text
      scale={[1.3, 1.3, 1.3]}
      position={[0, -viewport.height * 3.3, -5]}
      letterSpacing={0}
      font="bold"
      color="black" // default
      anchorX="center" // default
      anchorY="middle" // default
    >
      Tech Stack
    </Text>
  );
}

const ContactText = () => {
  const [hovering, setHovering] = useState(false);
  const viewport = useThree((state) => state.viewport);

  const onClick = () => {
    window.open('mailto:SoftwareWes@gmail.com', '_blank');
  };

  const onEnter = () => {
    setHovering(true);
    document.body.style.cursor = 'pointer';
  };
  const onLeave = () => {
    setHovering(false);
    document.body.style.cursor = 'inherit';
  };

  return (
    <Text
      scale={[0.8, 0.8, 0.8]}
      position={[0, -viewport.height * 5, -5]}
      letterSpacing={0}
      font="bold"
      color={hovering ? 'lightgreen' : 'black'}
      anchorX="center"
      anchorY="middle"
      onPointerDown={onClick}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      SoftwareWes@gmail.com
    </Text>
  );
};

function Box({ text, page, color, ...props }: BoxPropsI) {
  const [hovered, set] = useState(false);

  return (
    <mesh {...props} onPointerOver={(e) => set(true)} onPointerOut={(e) => set(false)}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={hovered ? 'lightgreen' : color} />
      {text}
    </mesh>
  );
}

function Scene() {
  const viewport = useThree((state) => state.viewport);
  return (
    <ScrollControls damping={0} pages={6} distance={0.5}>
      <Scroll>
        <Box
          color="#6874e8"
          page={1}
          position={[0, 0, -1]}
          text={
            <Text
              scale={[1, 1, 1]}
              position={[0, 0, 2]}
              letterSpacing={0}
              color="black" // default
              anchorX="center" // default
              anchorY="middle" // default
            >
              Hello!
            </Text>
          }
        />
        <Box
          color="#7A5C61"
          page={2}
          position={[0, -viewport.height, -1]}
          text={
            <Text
              scale={[0.9, 0.9, 0.9]}
              position={[0, 0, 2]}
              letterSpacing={0}
              font="bold"
              color="black" // default
              anchorX="center" // default
              anchorY="middle" // default
              maxWidth={1}
            >
              I'm Wes.
            </Text>
          }
        />
        <Box
          color="#f7accf"
          page={3}
          position={[0, -viewport.height * 2, -1]}
          text={
            <>
              <Text
                scale={[0.55, 0.55, 0.55]}
                position={[0, 0.85, 2]}
                letterSpacing={0}
                color="black" // default
                anchorX="center" // default
                anchorY="top" // default
                maxWidth={1}
              >
                I like software.
              </Text>
            </>
          }
        />
        <SkillPlanet />
        <TechStackText />
        <ContactText />
      </Scroll>
    </ScrollControls>
  );
}

const Overlay = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '25px',
        paddingTop: '5px',
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
      </ul>
    </div>
  );
};

export default function About() {
  const onMove = (e: any) => {
    // console.log(e);
  };
  return (
    <>
      <Overlay />
      <Canvas style={{ height: '100vh' }} onMouseMove={onMove}>
        <ambientLight />
        <pointLight position={[10, 0, 10]} />
        <Scene />
      </Canvas>
    </>
  );
}
