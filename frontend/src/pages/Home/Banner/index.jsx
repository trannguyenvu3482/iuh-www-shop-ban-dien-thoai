import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCustom from '../../../components/Swiper'
function BannerHome() {
  return (
    <div className="max-w-[1000px] flex-1 px-2 pb-2">
      <SwiperCustom />
      <div className="p-2">
        <Swiper
          modules={[Autoplay, Navigation]}
          navigation={true}
          loop={true}
          className="custom-swiper-hide h-fit rounded-xl"
          spaceBetween={0}
          slidesPerView={2}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <img
              className="rounded-lg"
              src="https://cdn.xtmobile.vn/vnt_upload/weblink/ip-cu.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="rounded-lg"
              src="https://cdn.xtmobile.vn/vnt_upload/weblink/watch.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="rounded-lg"
              src="https://cdn.xtmobile.vn/vnt_upload/weblink/ip-cu.jpg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="rounded-lg"
              src="https://cdn.xtmobile.vn/vnt_upload/weblink/watch.jpg"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default BannerHome
