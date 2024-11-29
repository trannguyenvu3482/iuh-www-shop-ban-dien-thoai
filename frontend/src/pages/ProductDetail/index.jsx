import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import { useProductById } from '../../hooks/useProduct'
import { formatVND } from '../../utils/format'
import { useUserStore } from '../../zustand/userStore'
import CapacitySection from './CapacitySection'
import Description from './Description'
import SlideProduct from './SlideProduct'
import useCart from '../../hooks/useCart'

const ProductDetail = () => {
  const navigate = useNavigate()

  const product = useProductById()
  const [selectedCapacity, setSelectedCapacity] = useState(-1)
  const [selectedVariant, setSelectedVariant] = useState(-1)
  const [openNotLoggedInModal, setOpenNotLoggedInModal] = useState(false)
  const { isAuthenticated } = useUserStore()
  const { toggleCart } = useCart()
  const selectedColorObject = product?.variants[selectedCapacity]?.colors.find(
    (color) => color.variantId === selectedVariant,
  )

  const handleSelectCapacity = (index) => {
    if (selectedCapacity !== index) {
      setSelectedVariant(-1)
    }
    setSelectedCapacity(index)
  }

  const uniqueImageUrls = Array.from(
    new Set(
      product?.variants?.flatMap((item) =>
        item.colors.map((color) => color.imageUrl),
      ),
    ),
  )

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setOpenNotLoggedInModal(true)
      return
    }

    if (selectedCapacity === -1 || selectedVariant === -1) {
      enqueueSnackbar('Vui lòng chọn một loại bộ nhớ và một màu để mua hàng', {
        variant: 'error',
        autoHideDuration: 3000,
        preventDuplicate: true,
      })
      return
    }
    toggleCart('increase', product.id, selectedVariant, 1)
    navigate('/cart')
  }

  return (
    <>
      <div className="bg-slate-100">
        <Breadcrumbs
          currentName={product?.name}
          categories={product?.categories}
        />
        <div className="mx-auto flex max-w-[1220px] gap-4 pb-4 pt-2">
          <div className="w-[50%] flex-1 rounded-b-md bg-white">
            <SlideProduct
              // imgs={[
              //   {
              //     image_url: product?.thumbnailUrl,
              //   },
              // ]}
              imgs={
                selectedCapacity === -1 || selectedVariant === -1
                  ? uniqueImageUrls
                  : [selectedColorObject?.imageUrl]
              }
            />
            {/* End */}
            <Description />
          </div>
          <div className="flex-1 rounded-md bg-white px-2 py-2">
            <div className="rounded-md border-2 border-gray-100 p-2">
              <h2 className="text-[22px] font-bold text-gray-800">
                {product?.name}
              </h2>
              <h2 className="mb-2 text-sm text-gray-500">
                Nhãn hàng: {product?.brand}
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
                    {product?.reviews.length}
                  </a>
                  <div className="rounded-md bg-red-100 px-2 py-1 text-[10px] font-semibold text-red-500">
                    Trả góp 0%
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-3xl font-bold text-primary-red">
                    {selectedCapacity === -1 || selectedVariant === -1
                      ? formatVND(product?.basePrice + 0)
                      : formatVND(selectedColorObject?.price + 0)}
                    đ
                  </div>
                  <div className="text-sm font-bold text-gray-600">
                    Giảm giá:
                    <span className="block text-end text-lg font-bold text-gray-800">
                      0%
                    </span>
                  </div>
                </div>
              </p>
              <>
                {/* Capacity */}
                <CapacitySection
                  handleSelectCapacity={handleSelectCapacity}
                  variants={product?.variants}
                  selectedCapacity={selectedCapacity}
                  selectedVariant={selectedVariant}
                  handleSelectVariant={setSelectedVariant}
                />
              </>
              {/* Button */}
              <div className="mt-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full rounded-lg bg-primary-red bg-opacity-80 px-5 py-2 text-center text-lg font-bold text-white hover:bg-opacity-100"
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
      <Modal
        style={{
          overlay: {
            zIndex: 100,
            backgroundColor: 'rgba(70, 70, 70, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 10,
          },
        }}
        isOpen={openNotLoggedInModal}
        onRequestClose={() => setOpenNotLoggedInModal(false)}
        contentLabel="Example Modal"
      >
        <div className="relative h-full w-full rounded-lg bg-white">
          <button
            type="button"
            className="absolute end-2.5 top-3 ms-auto inline-flex items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:text-gray-300"
            onClick={() => setOpenNotLoggedInModal(false)}
          >
            <IoClose className="h-6 w-6" />
          </button>
          <div className="p-4 text-center md:p-5">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn cần đăng nhập để mua sản phẩm này
            </h3>
            <button
              type="button"
              className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
              onClick={() => navigate('/login')}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
              onClick={() => setOpenNotLoggedInModal(false)}
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ProductDetail
