import { useState } from 'react'
import { FaHome, FaStar } from 'react-icons/fa'
import Modal from 'react-modal'
import { Link, useNavigate } from 'react-router-dom'
import { useProductById } from '../../hooks/useProduct'
import { formatVND } from '../../utils/format'
import { useUserStore } from '../../zustand/userStore'
import CapacitySection from './CapacitySection'
import Description from './Description'
import SlideProduct from './SlideProduct'
const ProductDetail = () => {
  const navigate = useNavigate()

  const product = useProductById()
  const [selectedCapacity, setSelectedCapacity] = useState()
  const [selectedColor, setSelectedColor] = useState('')
  const [openNotLoggedInModal, setOpenNotLoggedInModal] = useState(false)
  const { user } = useUserStore()

  const handleSelectColor = (color) => {
    setSelectedColor(color)
  }

  const handleSelectCapacity = (capacity) => {
    setSelectedCapacity(capacity)
  }

  const selectedColorObject = product?.variants
    .find((item) => item.id === selectedCapacity)
    ?.colors.find((color) => color.id === selectedColor)

  const uniqueImageUrls = Array.from(
    new Set(
      product?.variants?.flatMap((item) =>
        item.colors.map((color) => color.imageUrl),
      ),
    ),
  )

  const reverseHierarchyCategory = (category) => {
    const breadcrumbs = []
    let current = category

    while (current) {
      breadcrumbs.unshift(current)
      current = current.parent
    }

    return breadcrumbs
  }

  const breadcrumbs = reverseHierarchyCategory(product?.category)

  const handleAddToCart = () => {
    console.log('>>> product', product)

    console.log(product.id, selectedCapacity, selectedColor)
  }

  return (
    <>
      <div className="bg-slate-100">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-[1220px] border-b border-gray-100 bg-white"
        >
          <ol
            role="list"
            className="mx-auto flex w-full max-w-screen-xl space-x-2 px-4"
          >
            <li className="flex">
              <div className="flex items-center">
                <a href="/" className="text-gray-400 hover:text-gray-500">
                  <FaHome aria-hidden="true" className="size-5 shrink-0" />
                  <span className="sr-only">Home</span>
                </a>
              </div>
            </li>
            {breadcrumbs.map((page) => (
              <li key={page.name} className="flex">
                <div className="flex items-center">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 44"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="h-full w-6 shrink-0 text-gray-200"
                  >
                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                  </svg>
                  <Link
                    to={`/category/${page.id}`}
                    aria-current={page.current ? 'page' : undefined}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    {page.name}
                  </Link>
                </div>
              </li>
            ))}
            <li className="flex">
              <div className="flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="h-full w-6 shrink-0 text-gray-200"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <Link
                  to="#"
                  aria-current="page"
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {product?.name}
                </Link>
              </div>
            </li>
          </ol>
        </nav>
        <div className="mx-auto flex max-w-[1220px] gap-4 pb-4 pt-2">
          <div className="w-[50%] flex-1 rounded-b-md bg-white">
            <SlideProduct
              // imgs={[
              //   {
              //     image_url: product?.thumbnailUrl,
              //   },
              // ]}
              imgs={
                !selectedCapacity || !selectedColor
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
                    {!selectedCapacity || !selectedColor
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
                  capacities={product?.variants}
                  selectedCapacity={selectedCapacity}
                  selectedColor={selectedColor}
                  handleSelectColor={handleSelectColor}
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
        isOpen={openNotLoggedInModal}
        onRequestClose={() => setOpenNotLoggedInModal(false)}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={() => setOpenNotLoggedInModal(false)}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </>
  )
}

export default ProductDetail
