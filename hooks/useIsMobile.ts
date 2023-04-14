import { useState, useEffect } from 'react';

const useIsMobile = (): boolean | undefined => {
  const [matches, setMatches] = useState<boolean>();

  useEffect(() => {
    setMatches(window.matchMedia('(max-width: 768px)').matches);
    window.matchMedia('(max-width: 768px)').addEventListener('change', (e) => {
      setMatches(e.matches);
      // camera.updateProjectionMatrix();
    });
  }, []);

  return matches;
};

export default useIsMobile;
