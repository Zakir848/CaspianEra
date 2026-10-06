import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const authStorage = createJSONStorage(() => ({
  getItem: (name) =>
    localStorage.getItem(name) ?? sessionStorage.getItem(name),
  setItem: (name, value) => {
    const rememberMe = JSON.parse(value)?.state?.rememberMe !== false;
    const targetStorage = rememberMe ? localStorage : sessionStorage;
    const otherStorage = rememberMe ? sessionStorage : localStorage;

    targetStorage.setItem(name, value);
    otherStorage.removeItem(name);
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
}));

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      rememberMe: true,

      setAuth: ({
        user,
        accessToken,
        refreshToken,
        rememberMe,
      }) =>
        set((state) => ({
          user,
          accessToken,
          refreshToken,
          rememberMe: rememberMe ?? state.rememberMe,
        })),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'caspsanEra-authStorage',
      storage: authStorage,
    }
  )
);