import { useState } from 'react'
import CapacitySection from './CapacitySection'
import ColorSection from './ColorSection'
import { FaStar } from 'react-icons/fa'
import SlideProduct from './SlideProduct'
import Description from './Description'
import { useNavigate } from 'react-router-dom'

const capacities = [
  { label: '128GB', price: '24.499.000đ' },
  { label: '256GB', price: '27.799.000đ' },
  { label: '512GB', price: '26.999.000đ' },
]

const colors = [
  { label: 'Xanh Lưu Ly', price: '24.499.000đ', image: 'blue.png' },
  { label: 'Đen', price: '24.499.000đ', image: 'black.png' },
  { label: 'Xanh Mòng Két', price: '24.699.000đ', image: 'green.png' },
  { label: 'Hồng', price: '24.799.000đ', image: 'pink.png' },
  { label: 'Trắng', price: '24.899.000đ', image: 'white.png' },
]

const img = [
  {
    image_url:
      'https://cdn.xtmobile.vn/vnt_upload/product/11_2023/thumbs/600_2_1.png',
  },
  {
    image_url:
      'https://cdn.xtmobile.vn/vnt_upload/product/11_2023/thumbs/600_2_1.png',
  },
  {
    image_url:
      'https://cdn.xtmobile.vn/vnt_upload/product/11_2023/thumbs/600_2_1.png',
  },
]
const ProductDetail = () => {
  const [selectedCapacity, setSelectedCapacity] = useState('128GB')
  const [selectedColor, setSelectedColor] = useState('Xanh Lưu Ly')

  const handleSelectCapacity = (capacity) => {
    setSelectedCapacity(capacity)
  }
  const handleSelectColor = (color) => {
    setSelectedColor(color)
  }
  const navigate = useNavigate()

  return (
    <div className="bg-slate-100">
      <div className="mx-auto flex max-w-[1220px] gap-4 py-4">
        <div className="w-[50%] flex-1 rounded-md bg-white">
          <SlideProduct imgs={img} />
          {/* End */}
          <Description />
        </div>
        <div className="flex-1 rounded-md bg-white px-2 py-2">
          <div className="rounded-md border-2 border-gray-100 p-2">
            <h2 className="mb-2 text-[22px] font-bold text-gray-800">
              iPhone 16 Plus 128GB (VN/A)
            </h2>
            <p>
              <div className="mb-2 flex items-center space-x-2">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="text-md" />
                  ))}
                </div>
                <span className="text-sm text-gray-700">(5/5)</span>
                <a
                  href="#reviews"
                  className="text-[11px] font-[500] text-blue-500 hover:underline"
                >
                  15 đánh giá
                </a>
                <div className="rounded-md bg-red-100 px-2 py-1 text-[10px] text-red-500">
                  Trả góp 0%
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-3xl font-bold text-secondary-red">
                  24.499.000 đ
                </div>
                <div className="text-sm font-bold text-gray-600">
                  Chỉ cần trả trước:
                  <span className="block text-end text-lg font-bold text-gray-800">
                    7.349.700đ
                  </span>
                </div>
              </div>
            </p>

            {/* Capacity */}
            <CapacitySection
              handleSelectCapacity={handleSelectCapacity}
              capacities={capacities}
              selectedCapacity={selectedCapacity}
            />
            {/* Color */}
            <ColorSection
              handleSelectColor={handleSelectColor}
              selectedColor={selectedColor}
              colors={colors}
            />
            {/* Button */}
            <div className="mt-4">
              <button
                onClick={() => navigate('/cart')}
                className="w-full rounded-lg bg-primary-red px-5 py-2 text-center text-lg font-bold text-white hover:bg-secondary-red"
              >
                MUA NGAY
                <span className="block text-center text-sm font-normal">
                  Giao hàng tận nơi hoặc nhận cửa hàng
                </span>
              </button>
              <div className="mt-2 flex gap-2">
                <button className="text-md flex-1 rounded-lg bg-[#3567D8] py-2 text-center font-bold text-white hover:bg-slate-700">
                  TRẢ GÓP
                  <span className="block text-center text-sm font-normal">
                    Mua trả góp lãi suất thấp
                  </span>
                </button>
                <button className="text-md flex-1 rounded-lg bg-[#3567D8] py-2 text-center font-bold text-white hover:bg-slate-700">
                  TRẢ GÓP QUA THẺ
                  <span className="block text-center text-sm font-normal">
                    Visa, Master, JCB
                  </span>
                </button>
              </div>
            </div>
            {/* End */}
            <div className="">
              <div className="my-4 text-center text-sm text-gray-600">
                Hỗ trợ trực tuyến tốt nhất
                <a
                  href="tel:18006229"
                  className="font-semibold text-blue-500 hover:underline"
                >
                  1800.6229
                </a>
                Cần Tư vấn
                <a href="#" className="text-blue-500 hover:underline">
                  tại đây
                </a>
                .
              </div>
              <div className="mt-4 flex items-center rounded-md bg-gray-200 p-2">
                <span className="mr-2 text-sm">🔥</span>
                <span className="font-medium text-gray-800">
                  1 ưu đãi thêm khi mua máy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
