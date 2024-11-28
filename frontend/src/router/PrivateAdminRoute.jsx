import { Navigate, useNavigate } from 'react-router-dom'
import { useUserStore } from '../zustand/userStore'
import { useEffect } from 'react'
import { getUser } from '../service/apiUser'
const PrivateAdminRoute = ({ children }) => {
  // TODO: CHANGE THIS LATER
  const navigate = useNavigate()
  const { isAuthenticated } = useUserStore()

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUser(useUserStore.getState().user.id)

      if (data.userType === 'USER') {
        navigate('/404')
      }
    }

    fetchUser()
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <Navigate to="/404" />
  } else {
    return children
  }
}

export default PrivateAdminRoute
