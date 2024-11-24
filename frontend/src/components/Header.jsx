import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp, FaUser } from 'react-icons/fa6'
import { IoLogIn, IoSearchOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import Sticky from 'react-sticky-el'
import 'swiper/css'
import { EffectFade, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import categoriesIcon from '../assets/img/header/categories.svg'
import header1 from '../assets/img/header/header-1.jpg'
import header2 from '../assets/img/header/header-2.jpg'
import logo from '../assets/img/logo.png'
import webicons from '../assets/img/webicons.png'
import { hotProducts, storesAddress } from '../constants'

const Header = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const [showShowroom, setShowShowroom] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  return (
    <header>
      <div className={`${slideIndex === 0 ? 'bg-[#b82900]' : 'bg-black'}`}>
        <div className="mx-auto max-w-[1200px] bg-primary-red">
          <Swiper
            modules={[Navigation, EffectFade]}
            spaceBetween={0}
            allowTouchMove={false}
            slidesPerView={1}
            navigation
            loop={true}
            onSlideChange={(swiper) => {
              setSlideIndex(swiper.realIndex)
            }}
            effect="fade"
            className="!w-full"
          >
            <SwiperSlide>
              <img src={header1} alt="header-1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={header2} alt="header-2" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className={`z-10 bg-primary-red ${!isSticky && 'flex'}`}>
        <div
          className={`z-10 mx-auto ${isSticky ? '' : 'max-w-[1200px]'} bg-primary-red pb-2`}
        >
          <Sticky
            stickyClassName="z-10 mx-0 bg-primary-red"
            topOffset={110}
            onFixedToggle={() => setIsSticky(!isSticky)}
          >
            <div
              className={`z-10 mx-auto flex max-w-[1200px] bg-primary-red py-[10px]`}
            >
              <a className="flex h-fit" href="/">
                <img
                  className="mr-2 w-[172px] pl-2 pt-2"
                  src={logo}
                  alt="logo"
                />
              </a>
              <div className="relative float-left ml-6">
                <i
                  style={{
                    backgroundImage: `url(${webicons})`,
                    backgroundPosition: '-17px -18px',
                  }}
                  className="absolute top-[5px] block h-[26px] w-[27px]"
                ></i>
                <span className="mt-1 block pl-8 leading-4 text-white">
                  <a className="block font-bold" href="tel:18006229">
                    1800.6229
                  </a>
                  <span className="text-xs font-normal">Tổng đài miễn phí</span>
                </span>
              </div>
              <div className="search ml-6 flex h-[40px] w-[440px] rounded-md bg-white pl-2 focus-within:border focus-within:border-black">
                <button>
                  <IoSearchOutline className="h-7 w-7" />
                </button>
                <input
                  className="ml-2 mr-2 w-full rounded-md border-none text-xs outline-none placeholder:text-gray-500"
                  type="text"
                  placeholder="Bạn muốn tìm gì ?"
                />
              </div>

              <div className="stores relative z-10 ml-6">
                <span className="box-showroom border-radius-5 flex w-[130px] flex-col rounded-lg bg-[#333] bg-opacity-35 px-2 py-1 text-white">
                  <span className="text-xs">Hệ thống</span>
                  <b
                    className="flex cursor-pointer items-center gap-2 text-sm"
                    onClick={() => setShowShowroom(!showShowroom)}
                  >
                    10 cửa hàng{' '}
                    {showShowroom ? (
                      <FaAngleUp className="h-3 w-3" />
                    ) : (
                      <FaAngleDown className="h-3 w-3" />
                    )}
                  </b>
                </span>
                <div
                  className={`${
                    !showShowroom && 'hidden'
                  } list-showroom absolute left-0 top-[105%] z-10 w-[370px] rounded-md bg-white pb-1 text-xs drop-shadow-sm`}
                >
                  <div className="p-2">
                    <ul>
                      {storesAddress.map((value, index) => (
                        <li
                          className={`flex items-center ${
                            index != 9 && 'border-b'
                          } border-[#eee] py-[5px] pl-1 before:mr-1 before:block before:h-[5px] before:w-[5px] before:rounded-full before:bg-[#39b54a] before:content-['']`}
                          key={index}
                        >
                          {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* <div className="cart relative ml-6">
                <Link
                  to="/"
                  className="border-radius-5 flex h-full w-[100px] items-center justify-end rounded-lg bg-[#333] bg-opacity-35 pr-2 text-white transition-all hover:bg-white hover:bg-opacity-20 hover:text-black"
                >
                  <i
                    style={{
                      backgroundImage: `url(${webicons})`,
                      backgroundPosition: '-66px -18px',
                    }}
                    className="absolute left-[14px] top-[8px] block h-[20px] w-[17px]"
                  >
                    <span className="absolute left-[9px] top-[12px] flex h-4 w-4 items-center justify-center rounded-full bg-[#c60004] text-xs">
                      5
                    </span>
                  </i>
                  <span className="text-sm">Giỏ hàng</span>
                </Link>
              </div> */}

              <div className="ml-6 flex items-center justify-center text-white">
                <Link
                  to="/login"
                  className="flex h-full items-center justify-center gap-2 rounded-md bg-black bg-opacity-30 px-3 py-2 text-sm font-bold text-white transition-all hover:bg-opacity-50"
                >
                  <IoLogIn className="h-5 w-5" />
                  Đăng nhập
                </Link>
              </div>
              <div className="ml-2 flex items-center justify-center text-white">
                <Link
                  to="/signup"
                  className="flex h-full items-center justify-center gap-2 rounded-md bg-black bg-opacity-30 px-3 py-2 text-sm font-bold text-white transition-all hover:bg-opacity-50"
                >
                  <FaUser />
                  Đăng ký
                </Link>
              </div>

              {/* <div className="group z-20 ml-6 flex items-center justify-center text-white">
                <img
                  id="avatarButton"
                  type="button"
                  data-dropdown-toggle="userDropdown2"
                  data-dropdown-placement="bottom-start"
                  className="h-10 w-10 cursor-pointer rounded-full bg-white"
                  src="https://robohash.org/1?size=50x50"
                  alt="User dropdown"
                />

                <div
                  id="userDropdown"
                  className="absolute -right-16 top-14 z-20 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow group-hover:block dark:divide-gray-600 dark:bg-gray-700"
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>Trần Nguyên Vũ</div>
                    <div className="truncate font-medium">
                      trannguyenvu3482@gmail.com
                    </div>
                  </div>
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="avatarButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Lịch sử đơn hàng
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Cài đặt
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Trợ giúp
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Đăng xuất
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </Sticky>
          <div className="flex gap-3">
            <div className="categories flex h-[40px] w-[200px] items-center rounded-md bg-black bg-opacity-30 pl-3 text-white">
              <img className="h-[20px] w-[20px]" src={categoriesIcon} alt="" />
              <span className="ml-1 text-sm font-bold">Danh mục sản phẩm</span>
            </div>

            <div className="hot-products flex flex-1 items-center rounded-md bg-white pl-2">
              <p className="text-xs font-bold uppercase">Sản phẩm HOT:</p>

              <ul className="flex items-center">
                {hotProducts.map((product, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-2 px-2 transition-all hover:text-[#777] hover:underline ${
                      index !== hotProducts.length - 1
                        ? 'border-r border-gray-300'
                        : ''
                    }`}
                  >
                    <Link to={product.route}>
                      <span className="text-sm">{product.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
