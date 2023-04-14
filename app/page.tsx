'use client';

// https://coolors.co/7a5c61-f7accf-e8f0ff-6874e8-392759
// rose taupe 7a5c61
// lavendar pink f7accf
// alice blue e8f0ff
// medium slate blue 6874e8
// russian violet 392759

import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Html, Scroll, ScrollControls, Text } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import '@css/styles.css';
import Link from 'next/link';
import { Suspense } from 'react';
import Camera from '@helpers/Camera';
import useIsMobile from '@hooks/useIsMobile';

interface WordPropsI {
  children: any;
  position?: any;
}

const fontProps = {
  fontSize: 1.1,
  letterSpacing: -0.05,
  lineHeight: 1,
  'material-toneMapped': false,
};

function Word({ children, ...props }: WordPropsI) {
  const color = new THREE.Color();

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
      ref.current.material.color.lerp(color.set(hovered ? 'lightgreen' : 'black'), 0.1);
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
      fontSize={2}
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
  const viewport = useThree((state) => state.viewport);
  const ref = useRef<any>(null);
  const [hovering, setHovering] = useState(false);
  const isMobile = useIsMobile();

  let skills = [...originalSkills];

  const pickWord = () => {
    const pick = [...skills][0];
    skills = skills.filter((s) => s !== pick);
    return pick || 'foobar';
  };

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

  const groupScale: any = isMobile ? [0.15, 0.15, 0.15] : [0.175, 0.175, 0.175];
  const groupPosition: any = isMobile ? [0, -viewport.height * 4.1, -9] : [0, -viewport.height * 3.9, -5];

  return (
    <group
      ref={ref}
      scale={groupScale}
      position={groupPosition}
      onPointerOver={(e) => setHovering(true)}
      onPointerOut={(e) => setHovering(false)}
    >
      <mesh>
        <sphereGeometry args={[15, 32, 16]} />
        <meshStandardMaterial color={!hovering ? 'lightgrey' : 'lightgreen'} opacity={0.9} transparent />
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
  const isMobile = useIsMobile();

  const textScale: any = isMobile ? [0.8, 0.8, 0.8] : [1.1, 1.1, 1.1];
  const textPosition: any = isMobile ? [0, -viewport.height * 3.5, -5] : [0, -viewport.height * 3.2, -5];

  return (
    <Text
      scale={textScale}
      position={textPosition}
      color="black" // default
      anchorX="center" // default
      anchorY="middle" // default
      {...fontProps}
    >
      Tech Stack
    </Text>
  );
}

const ContactText = () => {
  const [hovering, setHovering] = useState(false);
  const viewport = useThree((state) => state.viewport);
  const isMobile = useIsMobile();

  const textScale: any = isMobile ? [0.8, 0.8, 0.8] : [1.1, 1.1, 1.1];
  const textPosition: any = isMobile ? [0, -viewport.height * 5.5, -5] : [0, -viewport.height * 5, -5];

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
    <>
      <Text
        scale={textScale}
        position={textPosition}
        color={hovering ? 'lightgreen' : 'black'}
        anchorX="center"
        anchorY="middle"
        onPointerDown={onClick}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        {...fontProps}
        fillOpacity={0.75}
      >
        Email Me
      </Text>
    </>
  );
};

function HelloBox() {
  const [hovered, set] = useState(false);
  const isMobile = useIsMobile();

  const boxArgs: any = isMobile ? [2, 2, 2] : [3, 3, 3];
  const textScale: any = isMobile ? [0.6, 0.6, 0.6] : [1, 1, 1];
  const textPosition: any = isMobile ? [-0.39, 0, 2] : [-0.2, 0, 2];

  return (
    <mesh
      onPointerOver={(e) => set(true)}
      onPointerOut={(e) => set(false)}
      rotation={[0, 0.3, 0]}
      position={[0, 0, -1]}
    >
      <boxGeometry args={boxArgs} />
      <meshStandardMaterial color={hovered ? 'lightgreen' : '#6874e8'} />
      <Text
        scale={textScale}
        position={textPosition}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
        {...fontProps}
      >
        Hello!
      </Text>
    </mesh>
  );
}

function ImWesBox() {
  const [hovered, set] = useState(false);
  const { viewport } = useThree();
  const isMobile = useIsMobile();

  const boxArgs: any = isMobile ? [2, 2, 2] : [3, 3, 3];
  const textScale: any = isMobile ? [0.5, 0.5, 0.5] : [0.9, 0.9, 0.9];
  const textPosition: any = isMobile ? [0.3, -0.1, 2] : [0.15, 0, 2];

  return (
    <mesh
      onPointerOver={(e) => set(true)}
      onPointerOut={(e) => set(false)}
      rotation={[0, -0.3, 0]}
      position={[0, -viewport.height, -1]}
    >
      <boxGeometry args={boxArgs} />
      <meshStandardMaterial color={hovered ? 'lightgreen' : '#7A5C61'} />
      <Text
        scale={textScale}
        position={textPosition}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
        {...fontProps}
        maxWidth={1}
      >
        I'm Wes.
      </Text>
    </mesh>
  );
}

function MakeSoftwareBox() {
  const [hovered, set] = useState(false);
  const { viewport } = useThree();
  const isMobile = useIsMobile();

  const boxArgs: any = isMobile ? [2, 2, 2] : [3, 3, 3];
  const textScale: any = isMobile ? [0.3, 0.3, 0.3] : [0.55, 0.55, 0.55];
  const textPosition: any = isMobile ? [0, 0.45, 2] : [0, 0.9, 2];

  return (
    <mesh
      onPointerOver={(e) => set(true)}
      onPointerOut={(e) => set(false)}
      rotation={[0, 0, 0]}
      position={[0, -viewport.height * 2, -1]}
    >
      <boxGeometry args={boxArgs} />
      <meshStandardMaterial color={hovered ? 'lightgreen' : '#f7accf'} />
      <Text
        scale={textScale}
        position={textPosition}
        color="black" // default
        anchorX="center" // default
        anchorY="top" // default
        maxWidth={1}
        {...fontProps}
      >
        I make software.
      </Text>
    </mesh>
  );
}

function Scene() {
  const { viewport, gl } = useThree();
  const isMobile = useIsMobile();

  const htmlRotation: any = [0.1, 0.4, 0.05];
  const htmlScale: any = isMobile ? [0.8, 0.8, 0.8] : [1, 1, 1];
  const textPosition: any = isMobile ? [0.25, -viewport.height * 6, -3] : [0.5, -viewport.height * 5.6, -3];

  return (
    <ScrollControls damping={0} pages={7} distance={0.5}>
      <Scroll>
        <HelloBox />
        <ImWesBox />
        <MakeSoftwareBox />
        <SkillPlanet />
        <TechStackText />
        <ContactText />
        <Html
          scale={htmlScale}
          transform
          portal={{ current: gl.domElement.parentNode as any }}
          rotation={htmlRotation}
          position={textPosition}
        >
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
      </Scroll>
    </ScrollControls>
  );
}

const Overlay = () => {
  return (
    <div
      style={{
        fontSize: '20px',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '25px',
        paddingTop: '10px',
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
      </ul>
    </div>
  );
};

export default function App() {
  const onMove = (e: any) => {
    // console.log(e);
  };

  return (
    <>
      <Overlay />
      <Canvas style={{ height: '100vh' }} onMouseMove={onMove} shadows>
        <Camera />
        <ambientLight />
        <pointLight position={[10, 0, 10]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  );
}
