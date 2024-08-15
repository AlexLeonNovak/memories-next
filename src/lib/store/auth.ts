import { UserInfo } from '@firebase/auth-types';
import { create } from 'zustand';

type TAuthState = {
  user: UserInfo | null;
};

type TAuthAction = {
  setUser: (user: UserInfo | null) => void;
};

export const useAuthStore = create<TAuthState & TAuthAction>(set => ({
  user: null,
  setUser: user => set(() => ({ user })),
}));
