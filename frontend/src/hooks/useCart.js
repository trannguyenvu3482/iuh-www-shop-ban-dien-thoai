import { useSnackbar } from 'notistack'
import { deleteCartItem, putToggleCartItem } from '../service/apiCart'
import { useUserStore } from '../zustand/userStore'

const useCart = () => {
  const TOGGLE_TYPE = {
    ADD: 'increase',
    REMOVE: 'decrease',
  }
  const setCart = useUserStore((s) => s.setCart)
  const { enqueueSnackbar } = useSnackbar()
  const toggleCart = async (type, productId, productVariantId, quantity) => {
    if (!type) {
      return
    }
    const result = await putToggleCartItem(
      productId,
      productVariantId,
      quantity,
      type,
    )
    if (result.statusCode === 200) {
      setCart({
        totalPrice: result.data?.totalPrice,
        cartDetails: result?.data?.cartDetails,
        totalItems: result?.data?.cartDetails.length,
      })
      enqueueSnackbar('Cập nhật giỏ hàng thành công', { variant: 'success' })
    } else if (result.statusCode === 400) {
      enqueueSnackbar(result?.error, { variant: 'error' })
    } else
      enqueueSnackbar('Có lỗi xảy ra, vui lòng thử lại', { variant: 'error' })
  }

  const onDeleteCartItem = async (productId, productVariantId) => {
    const result = await deleteCartItem(productId, productVariantId)
    if (result.statusCode === 200) {
      setCart({
        totalPrice: result.data.totalPrice,
        cartDetails: result.data.cartDetails,
      })
      enqueueSnackbar('Xóa sản phẩm khỏi giỏ hàng thành công', {
        variant: 'success',
      })
    } else if (result.statusCode === 400) {
      enqueueSnackbar(result?.error, { variant: 'error' })
    } else
      enqueueSnackbar('Có lỗi xảy ra, vui lòng thử lại', { variant: 'error' })
  }

  
  return {
    toggleCart,
    onDeleteCartItem,
    TOGGLE_TYPE,
  }
}

export default useCart
