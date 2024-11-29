import { create } from 'zustand'

export const useAppStore = create((set) => ({
  isGlobalLoading: false,
  setIsGlobalLoading: (isGlobalLoading) => set({ isGlobalLoading }),
}))
