import { useRef, useState } from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

function SlideProduct({ imgs }) {
  const [select, setSelect] = useState(0)
  const swiperRef = useRef(null)

  return (
    <div className="px-4 py-6">
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={true}
        loop={imgs.length > 1 ? true : false}
        className="mx-auto h-fit rounded-xl"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => {
          setSelect(swiper.realIndex)
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
      >
        <>
          {imgs.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                className="mx-auto h-[400px] w-[400px] self-center rounded-lg"
                src={img}
                alt={`Slide ${index}`}
              />
            </SwiperSlide>
          ))}
        </>
      </Swiper>
      <div className="mt-6">
        <div className="mx-12 flex justify-center">
          {imgs.map((img, index) => (
            <button
              onClick={() => {
                setSelect(index)
                swiperRef.current.slideTo(index)
              }}
              key={index}
              className={`mx-4 rounded-md border-2 ${
                select === index ? 'border-primary-red' : 'border-gray-300'
              } px-2 py-1 hover:border-primary-red`}
            >
              <img
                className="mx-auto h-16 w-14 self-center rounded-lg"
                src={img}
                alt={`Thumbnail ${index}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SlideProduct
