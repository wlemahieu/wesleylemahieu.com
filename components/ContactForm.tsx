'use client';

import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import useIsMobile from '@hooks/useIsMobile';

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

export default ContactForm;
