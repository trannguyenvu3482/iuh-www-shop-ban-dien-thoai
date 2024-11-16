import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Navigation, Pagination } from 'swiper/modules'

export default function SwiperCustom() {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={true}
        pagination={true}
        loop={true}
        className="custom-swiper-hide h-fit rounded-xl pt-2"
        spaceBetween={0}
        slidesPerView={1}
        paginationClickable={true}
      >
        <SwiperSlide>
          <div>
            <img src="https://cdn.xtmobile.vn/vnt_upload/weblink/a06.png" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src="https://cdn.xtmobile.vn/vnt_upload/weblink/2ip15-23.jpg" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src="https://cdn.xtmobile.vn/vnt_upload/weblink/2sale-samsung.jpg" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}
