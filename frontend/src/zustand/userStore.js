import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: {},
      accessToken: "",
      isAuthenticated: false,
      setUser: (user) => {
        set({ user });
      },
      setAccessToken: (accessToken) => {
        set({ accessToken });
      },
      setIsAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated });
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
