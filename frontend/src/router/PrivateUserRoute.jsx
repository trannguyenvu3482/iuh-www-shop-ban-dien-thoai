import { enqueueSnackbar } from 'notistack'
import { Navigate } from 'react-router-dom'
import { useUserStore } from '../zustand/userStore'

const PrivateUserRoute = ({ children }) => {
  // TODO: CHANGE THIS LATER
  const { user, isAuthenticated } = useUserStore()

  console.log(children)

  if (!isAuthenticated) {
    enqueueSnackbar('Vui lòng đăng nhập để truy cập trang này', {
      variant: 'error',
      autoHideDuration: 3000,
      preventDuplicate: true,
    })
    return <Navigate to="/" />
  }
  return children
}

export default PrivateUserRoute
