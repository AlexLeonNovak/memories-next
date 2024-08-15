import { create } from 'zustand';

type TState = {
  state: { [key: string]: any };
};

type TStateStore = {
  setStateValue: (key: string, value: any) => void;
  getStateValue: (key: string) => any;
  clearState: () => void;
};

export const useStateStore = create<TStateStore>((set, get) => ({
  setStateValue: (key, value) => set(prevState => ({ ...prevState, [key]: value })),
  getStateValue: (key: string) => {
    const state = get() as { [key: string]: any };
    let value;
    if (key in state) {
      value = state[key];
      delete state[key];
      set(() => state);
    }
    return value;
  },
  clearState: () => set(() => ({})),
}));
