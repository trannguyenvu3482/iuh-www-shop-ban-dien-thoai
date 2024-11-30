import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

function BannerCategories() {
  return (
    <div className="max-w-[1220px] flex-1 pb-2">
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={true}
        loop={true}
        className="custom-swiper-hide h-fit rounded-xl"
        spaceBetween={20}
        style={{ height: '160px' }}
        slidesPerView={3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img
            className="rounded-xl"
            style={{ height: '160px' }}
            src="https://www.xtmobile.vn/vnt_upload/weblink/22ip13-23-5.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-xl"
            style={{ height: '160px' }}
            src="https://www.xtmobile.vn/vnt_upload/weblink/22mb-ip11.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-xl"
            style={{ height: '160px' }}
            src="https://www.xtmobile.vn/vnt_upload/weblink/3mb-ip12.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-xl"
            style={{ height: '160px' }}
            src="https://www.xtmobile.vn/vnt_upload/weblink/22mb-ip14.jpg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default BannerCategories
