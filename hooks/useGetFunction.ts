import useGetApp from './useGetApp';
import { getFunctions, HttpsCallable, httpsCallable } from '@firebase/functions';

const useGetFunction = (functionName: string): HttpsCallable<unknown, unknown> => {
  const app = useGetApp();
  const region = 'us-central1';
  const functions = getFunctions(app, region);
  return httpsCallable(functions, functionName);
};

export default useGetFunction;
