import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import CardProduct from '../../../components/Card/CardProduct'
import { PRODUCT_DUMMY_DATA } from '../../../constants'

function HeadSection() {
  return (
    <section className="rounded-t-xl bg-[#bdc7ec]">
      <img
        src="https://www.xtmobile.vn/vnt_upload/File/Image/wb16.jpg"
        className="w-full rounded-t-xl"
        alt=""
      />
      <div className="px-2">
        <Swiper
          modules={[Navigation]}
          className="!w-full"
          navigation={true}
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          autoHeight={true}
        >
          {PRODUCT_DUMMY_DATA.map((product) => (
            <SwiperSlide key={product.productId}>
              <CardProduct
                imgURL={product.imgURL}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                initPayment={product.initPayment}
                rating={product.rating}
                productId={product.productId}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center">
        <button className="mb-2 mt-4 w-64 rounded-lg bg-white px-4 py-2 text-sm">
          Xem tất cả{' '}
        </button>
      </div>
    </section>
  )
}

export default HeadSection
