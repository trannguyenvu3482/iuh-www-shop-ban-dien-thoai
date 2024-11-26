import { useUserStore } from '../zustand/userStore'

export const useMe = () => {
  const { user } = useUserStore()

  return {
    me: user,
  }
}

export default useMe
