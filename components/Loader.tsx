import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html center>
      <h2>Loading...</h2>
      <h1>{Math.round(progress)}%</h1>
    </Html>
  );
};

export default Loader;
