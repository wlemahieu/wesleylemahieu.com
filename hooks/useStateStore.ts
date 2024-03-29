import { create } from 'zustand';

const useStateStore = create((set) => ({
  scroll: 0,
  sound: 'mute',
  setScroll: (scroll: number) => set({ scroll }),
  setSound: (sound: string) => set({ sound }),
}));

export default useStateStore;
