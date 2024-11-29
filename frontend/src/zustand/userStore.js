import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      cart: {
        totalPrice: '',
        cartDetails: [],
        totalItems: 0,
      },
      setUser: (user) => {
        set({ user })
      },
      setAccessToken: (accessToken) => {
        set({ accessToken })
      },
      setIsAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated })
      },
      setCart: (cart) => {
        set({ cart })
      },
      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
