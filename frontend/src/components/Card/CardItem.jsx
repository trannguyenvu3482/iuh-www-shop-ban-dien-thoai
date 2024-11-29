import { FaRegTrashAlt } from 'react-icons/fa'
import InputQuantity from '../InputQuantity'
import { formatVND } from '../../utils/format'
import useCart from '../../hooks/useCart'

function CardItem({ cartItemValue }) {
  const { toggleCart, onDeleteCartItem } = useCart()
  const toggleCounting = (count, type) => {
    toggleCart(type, cartItemValue.productId, cartItemValue.variant.id, count)
  }

  return (
    <div className="mx-2 flex items-center justify-between border-b-[1px] border-gray-200 px-2 py-2">
      <div className="flex items-center gap-4">
        <img
          className="ml-4 h-16 w-16 rounded-md border border-gray-200 p-1"
          src={cartItemValue?.variant?.imageUrl}
          alt=""
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            {cartItemValue?.productName}
          </h3>
          <h6 className="mt-1 text-xs font-normal text-blue-600">
            Dung lượng:
            <span className="ml-[2px] text-xs font-bold text-blue-600">
              {cartItemValue?.variant?.storage}
            </span>
          </h6>
          <h6 className="text-xs font-normal text-blue-600">
            Màu sắc:
            <span className="ml-[2px] text-xs font-bold text-blue-600">
              {cartItemValue?.variant?.color}
            </span>
          </h6>
        </div>
      </div>
      {/*Quantity*/}
      <div className="flex items-center gap-3">
        <div>
          <h5 className="my-1 text-sm font-bold text-primary-red">
            {' '}
            {formatVND(cartItemValue.price)}
            {' VND'}
          </h5>
        </div>
        <InputQuantity
          initCount={cartItemValue.quantity}
          toggleCounting={toggleCounting}
        />
        <button
          onClick={() =>
            onDeleteCartItem(cartItemValue.productId, cartItemValue.variant.id)
          }
          className="ml-2"
        >
          <FaRegTrashAlt className="hover:text-primary-red" />
        </button>
      </div>
    </div>
  )
}

export default CardItem
