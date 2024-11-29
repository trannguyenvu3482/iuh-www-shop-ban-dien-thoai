import { Navigate } from 'react-router-dom'
import { useUserStore } from '../zustand/userStore'

const PrivateAdminRoute = ({ children }) => {
  // TODO: CHANGE THIS LATER
  const { user, isAuthenticated } = useUserStore()
  console.log("🚀 ~ PrivateAdminRoute ~ isAuthenticated:", isAuthenticated)

  console.log(children)

  if (!isAuthenticated) {
    return <Navigate to="/404" />
  }
  return children
}

export default PrivateAdminRoute
