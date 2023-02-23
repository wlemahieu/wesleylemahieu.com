'use client';

import { range } from 'lodash';
import { useEffect, useRef, useState } from 'react';

const blues = [
  '#81B7F0', // l2 blue
  '#569FEB', // l1 blue
  '#3089E6', // blue
  '#0F75DF', // d1 blue
  '#0657AC', // d2 blue
];

const greens = [
  '#78F1C9', // l2 green
  '#49ECB7', // l1 green
  '#21E7A6', // green
  '#00E097', // d1 green
  '#00B076', // d2 green
];

const oranges = [
  '#FFC977', // l2 orange
  '#FFB84E', // l1 orange
  '#FFA825', // orange
  '#DB8402', // d1 orange
  '#AC6700', // d2 orange
];

const initialColorsOrder = [
  ...blues,
  ...greens, 
  ...oranges,
];

// 52-100 range ideal. (100 = white, 52 = main color)
const t = range(250).map((_d, key) => {
  if (key >= 52 && key <= 100) {
    const pct = key;
    const d = `hsl(160, 80%, ${pct}%)`;
    return d;
  }
  return '#fff'
});

const Navigation = ({children}: any) => {
  const colorsRef = useRef<Array<string>>([]);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    colorsRef.current = t;
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const n = [...colorsRef.current];
      const firstElement = n.shift() as string;
      n.push(firstElement);
      colorsRef.current = n;
      if (navRef.current) {
        navRef.current.style.borderImageSource = `linear-gradient(45deg, ${n.join(',')})`;
      }
    }, 15);

    return () => clearInterval(t);
  }, [navRef, colorsRef]);

  /*
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);

  

  const coordSum = mousePos.x + mousePos.y;
  const modifier = 1 / coordSum * 100;
  const degreeAngle = 360 * modifier;

  console.log({coordSum, modifier, degreeAngle, colorString });
  console.log('x', mousePos.x);
  console.log('y', mousePos.y);
  */

  const gradientRoot = {
    border: 'none',
    borderTop: '3px solid',
    borderTopWidth: '3px',
    borderImageSlice: '1',
    borderImageSource: `linear-gradient(45deg, ${t.join(',')})`,
    width: '100%',
    padding: '1rem',
    // opacity: '.55'
  };

  return (
    <nav ref={navRef} style={gradientRoot}>
      {children}
    </nav>
  )
};

export default Navigation;