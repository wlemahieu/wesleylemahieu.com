import { useEffect, useState } from 'react';

const keys: any = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  Space: 'jump',
  ShiftLeft: 'run',
  ShiftRight: 'dance',
};

const moveFieldByKey = (key: any) => keys[key];

type MovementT = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  run: boolean;
  dance: boolean;
};

const usePlayerControls = (currentAction: any) => {
  const [movement, setMovement] = useState<MovementT>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    run: false,
    dance: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      const key = moveFieldByKey(e.code);
      currentAction.current = key;
      setMovement((m) => ({ ...m, [key]: true }));
    };
    const handleKeyUp = (e: any) => {
      const key = moveFieldByKey(e.code);
      currentAction.current = undefined;
      setMovement((m) => ({ ...m, [key]: false }));
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  return movement;
};

export default usePlayerControls;
