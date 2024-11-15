import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {  Pagination } from 'swiper/modules';

export default function SwiperCustom() {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        modules={[Pagination]}
      >
        <SwiperSlide>
        <div >
        <img src='https://cdn.xtmobile.vn/vnt_upload/weblink/a06.png'/>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div >
        <img src='https://cdn.xtmobile.vn/vnt_upload/weblink/2ip15-23.jpg'/>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div >
        <img src='https://cdn.xtmobile.vn/vnt_upload/weblink/2sale-samsung.jpg'/>
        </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
