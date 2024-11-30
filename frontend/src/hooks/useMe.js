import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../zustand/userStore'
import { useSnackbar } from 'notistack'
import { login } from '../service/apiAuthentication'
import { getCart } from '../service/apiCart'
import { getUser, getUsers } from '../service/apiUser'
export const useMe = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useUserStore()
  const { setUser, setAccessToken, setIsAuthenticated, setCart, cart } =
    useUserStore()
  const { totalItems, cartDetails, totalPrice } = cart

  const navigate = useNavigate()
  const handleLogin = async (values) => {
    try {
      const { data } = await login(values.email, values.password)
      if (data.statusCode === 401) {
        enqueueSnackbar(data.message, {
          variant: 'error',
          autoHideDuration: 3000,
          preventDuplicate: true,
        })
      } else {
        setAccessToken(data.access_token)
        setIsAuthenticated(true)

        const rs = await getCart()
        setCart({
          totalPrice: rs.data?.totalPrice,
          cartDetails: rs?.data?.cartDetails,
          totalItems: rs?.data?.cartDetails.length,
        })
        setUser(data?.user)

        enqueueSnackbar(
          'Đăng nhập thành công, đang chuyển hướng đến trang chủ',
          {
            variant: 'success',
            autoHideDuration: 3000,
            preventDuplicate: true,
          },
        )
        if (data.user.userType === 'USER') navigate('/')
        else navigate('/admin')
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {
        variant: 'error',
        autoHideDuration: 3000,
        preventDuplicate: true,
      })
    }
  }
  return {
    totalItems,
    cartDetails,
    totalPrice,
    me: user,
    handleLogin,
  }
}

export default useMe
