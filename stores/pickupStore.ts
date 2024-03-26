import { create } from 'zustand';

interface Source {
  name: string;
  latitude: number;
  longitude: number;
}

interface Store {
  source: Source;
  setSource: (source: Source) => void;
}

export const useSourceStore = create<Store>((set) => ({
  source: {
    name: '',
    latitude: 0,
    longitude: 0,
  },
  setSource: (source) => set({ source }),
}));
