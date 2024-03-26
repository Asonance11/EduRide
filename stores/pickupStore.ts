import { create } from 'zustand';

interface Source {
  pickupName: string;
  latitude: number;
  longitude: number;
}

interface Store {
  source: Source;
}

interface Action {
  updateName: (pickupName: Source['pickupName']) => void;
  updateLatitude: (latitude: Source['latitude']) => void;
  updateLongitude: (longitude: Source['longitude']) => void;
}

export const useSourceStore = create<Source & Action>((set) => ({
  pickupName: '',
  latitude: 0,
  longitude: 0,
  updateName: (pickupName) => set(() => ({ pickupName: pickupName })),
  updateLatitude: (latitude) => set(() => ({ latitude: latitude })),
  updateLongitude: (longitude) => set(() => ({ longitude: longitude })),
}));
