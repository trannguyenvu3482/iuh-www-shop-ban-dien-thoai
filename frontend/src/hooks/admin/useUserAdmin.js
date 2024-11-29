import { useEffect, useState } from 'react'
import { getUsers } from '../../service/apiUser'
import { useAppStore } from '../../zustand/useApp'

export const useGetUsers = () => {
  const [users, setUsers] = useState([])
  const isLoading = useAppStore((s) => s.isGlobalLoading)
  const setLoading = useAppStore((s) => s.setIsGlobalLoading)
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const response = await getUsers()
      if (response.statusCode === 200) setUsers(response?.data?.result)
      setLoading(false)
    }
    fetchUsers()
  }, [])
  return {
    users,
    isLoading,
  }
}
