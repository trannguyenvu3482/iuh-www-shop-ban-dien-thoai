import { Navigate } from 'react-router-dom'
import { useUserStore } from '../zustand/userStore'

const PrivateRoute = ({ children }) => {
  // TODO: CHANGE THIS LATER
  const { user, isAuthenticated } = useUserStore()

  console.log(children)

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }
  return children
}

export default PrivateRoute
