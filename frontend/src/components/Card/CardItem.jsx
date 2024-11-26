import { useState } from 'react'
import InputQuantity from '../InputQuantity'

function CardItem() {
  const [count, setCount] = useState(1)
  const toggleCounting = (count) => {
    setCount(count)
  }
  return (
    <div className="mx-2 mb-4 flex justify-between gap-4 border-b-[1px] border-gray-200 px-10 pb-4">
      <div className="">
        <img
          className="h-24 w-24"
          src="https://cdn.xtmobile.vn/vnt_upload/product/06_2024/thumbs/(200x200)_crop_16pd.jpg"
          alt=""
        />
        <a href="" className="text-secondary-red text-center text-[10px]">
          {' '}
          Xóa khỏi giỏ hàng
        </a>
      </div>
      <div>
        <h3 className="text-sm font-bold text-gray-700">
          iPhone 16 Pro 128GB (VN/A)
        </h3>
        <h5 className="my-2 text-sm text-primary-red"> 55.798.000đ </h5>
        <h6 className="text-[12px] font-normal text-blue-600">
          Màu sắc:
          <span className="ml-[2px] text-[14px] font-bold text-blue-600">
            red
          </span>
        </h6>
      </div>
      {/*Quantity*/}
      <div className="mt-auto">
        <InputQuantity initCount={count} toggleCounting={toggleCounting} />
      </div>
    </div>
  )
}

export default CardItem
