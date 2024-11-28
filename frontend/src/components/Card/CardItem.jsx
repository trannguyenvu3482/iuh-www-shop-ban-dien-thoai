import { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import InputQuantity from '../InputQuantity'

function CardItem() {
  const [count, setCount] = useState(1)
  const toggleCounting = (count) => {
    setCount(count)
  }
  return (
    <div className="mx-2 mb-4 flex items-center justify-between border-b-[1px] border-gray-200 px-2 pb-2">
      <div className="flex items-center gap-4">
        <img
          className="ml-4 h-16 w-16 rounded-md border border-gray-200 p-1"
          src="https://cdn.xtmobile.vn/vnt_upload/product/06_2024/thumbs/(200x200)_crop_16pd.jpg"
          alt=""
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            iPhone 16 Pro 128GB (VN/A)
          </h3>
          <h6 className="text-xs font-normal text-blue-600">
            Dung lượng:
            <span className="ml-[2px] text-sm font-bold text-blue-600">
              128GB
            </span>
          </h6>
          <h6 className="text-xs font-normal text-blue-600">
            Màu sắc:
            <span className="ml-[2px] text-sm font-bold text-blue-600">Đỏ</span>
          </h6>
        </div>
      </div>
      {/*Quantity*/}
      <div className="flex items-center gap-3">
        <div>
          <h5 className="my-1 text-sm font-bold text-primary-red">
            {' '}
            55.798.000đ{' '}
          </h5>
        </div>
        <InputQuantity initCount={count} toggleCounting={toggleCounting} />
        <button className="ml-2">
          <FaRegTrashAlt className="hover:text-primary-red" />
        </button>
      </div>
    </div>
  )
}

export default CardItem
