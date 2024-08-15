import { create } from 'zustand';

type TState = {
  state: { [key: string]: any };
};

type TStateStore = {
  setStateValue: (key: string, value: any) => void;
  getStateValue: (key: string) => any;
  deleteStateValue: (key: string) => void;
  clearState: () => void;
};

export const useStateStore = create<TStateStore>((set, get) => ({
  setStateValue: (key, value) => set((prevState) => ({ ...prevState, [key]: value })),
  getStateValue: (key: string) => {
    const state = get() as { [key: string]: any };
    return key in state && state[key];
  },
  deleteStateValue: (key) => {
    const state = get() as { [key: string]: any };
    if (key in state) {
      delete state[key];
      set(() => state);
    }
  },
  clearState: () => set(() => ({})),
}));
