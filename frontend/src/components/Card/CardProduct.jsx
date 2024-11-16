import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Chip from '../Chip'

function CardProduct(props) {
  const {
    imgURL,
    rating,
    chips,
    name,
    price,
    oldPrice,
    initPayment,
    productId,
  } = props

  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/product/${productId}`)}
      key={productId}
      className="relative flex h-[380px] w-full cursor-pointer flex-col justify-center rounded-lg bg-white px-3 duration-300 hover:shadow-md hover:shadow-slate-400"
    >
      {chips && (
        <>
          {chips.map((chip, index) => (
            <Chip key={index} color={chip.color} label={chip.label} />
          ))}
        </>
      )}
      <div className="mt-4">
        <img className="mx-auto w-[150px] object-cover" src={imgURL} />
      </div>
      <a className="mt-6 text-sm font-bold text-slate-800" href="">
        {name}
      </a>
      <div>
        <h1 className="mt-2 font-bold text-primary-red">
          {price} đ
          <span className="ml-2 text-[13px] font-normal text-[#989898] line-through">
            {oldPrice}đ
          </span>
        </h1>
      </div>
      <h1 className="mt-2 text-[12px] text-slate-600">
        Trả trước{' '}
        <span className="font-bold text-slate-800">{initPayment}</span>
      </h1>
      <div className="mt-4 flex gap-0.5">
        {rating &&
          Array.from({ length: rating }, (_, index) => (
            <FaStar key={index} className="w-3.5 text-yellow-500" />
          ))}
      </div>
    </div>
  )
}

export default CardProduct
