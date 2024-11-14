import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "swiper/css";
import { EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import categoriesIcon from "../assets/img/header/categories.svg";
import header1 from "../assets/img/header/header-1.jpg";
import header2 from "../assets/img/header/header-2.jpg";
import logo from "../assets/img/logo.png";
import webicons from "../assets/img/webicons.png";
import { hotProducts, storesAddress } from "../constants";
const Header = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showShowroom, setShowShowroom] = useState(false);
  return (
    <header>
      <div className={`${slideIndex === 0 ? "bg-[#b82900]" : "bg-black"}`}>
        <div className="max-w-[1200px] mx-auto bg-primary-red">
          <Swiper
            modules={[Navigation, EffectFade]}
            spaceBetween={0}
            allowTouchMove={false}
            slidesPerView={1}
            navigation
            loop={true}
            onSlideChange={(swiper) => {
              console.log(swiper.realIndex);

              setSlideIndex(swiper.realIndex);
            }}
            effect="fade"
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
      <div className="bg-primary-red">
        <div className="max-w-[1200px] mx-auto pb-2">
          <div className="flex top py-[10px]">
            <a className="flex h-fit" href="/">
              <img className="w-[172px] mr-2 pt-2 pl-2" src={logo} alt="logo" />
            </a>
            <div className="relative ml-6 float-left">
              <i
                style={{
                  backgroundImage: `url(${webicons})`,
                  backgroundPosition: "-17px -18px",
                }}
                className="block h-[26px] absolute top-[5px] w-[27px]"
              ></i>
              <span className="block pl-8 text-white leading-4 mt-1">
                <a className="block font-bold" href="tel:18006229">
                  1800.6229
                </a>
                <span className="text-xs font-normal">Tổng đài miễn phí</span>
              </span>
            </div>
            <div className="search w-[440px] bg-white ml-6 h-[40px] rounded-md flex pl-2 focus-within:border focus-within:border-black">
              <button>
                <IoSearchOutline className="w-7 h-7" />
              </button>
              <input
                className="rounded-md border-none outline-none ml-2 text-sm"
                type="text"
              />
            </div>

            <div className="stores relative ml-6">
              <span className="box-showroom border-radius-5 flex flex-col text-white bg-[#333] bg-opacity-35 w-[130px] px-2 py-1 rounded-lg">
                <span className="text-xs">Hệ thống</span>
                <b
                  className="text-sm flex gap-2 items-center cursor-pointer"
                  onClick={() => setShowShowroom(!showShowroom)}
                >
                  10 cửa hàng{" "}
                  {showShowroom ? (
                    <FaAngleUp className="w-3 h-3" />
                  ) : (
                    <FaAngleDown className="w-3 h-3" />
                  )}
                </b>
              </span>
              <div
                className={`${
                  !showShowroom && "hidden"
                } list-showroom absolute w-[370px] left-0 top-[105%] bg-white rounded-md text-xs drop-shadow-sm pb-1`}
              >
                <div className="p-2">
                  <ul>
                    {storesAddress.map((value, index) => (
                      <li
                        className={`flex items-center ${
                          index != 9 && "border-b"
                        } border-[#eee] py-[5px] pl-1 before:bg-[#39b54a] before:content-[''] before:block before:w-[5px] before:h-[5px] before:mr-1 before:rounded-full`}
                        key={index}
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="cart ml-6 relative">
              <Link
                to="/"
                className="border-radius-5 flex text-white bg-[#333] hover:bg-white hover:bg-opacity-20 hover:text-black transition-all bg-opacity-35 w-[100px] rounded-lg h-full items-center justify-end pr-2"
              >
                <i
                  style={{
                    backgroundImage: `url(${webicons})`,
                    backgroundPosition: "-66px -18px",
                  }}
                  className="block h-[20px] absolute top-[8px] left-[14px] w-[17px]"
                >
                  <span className="absolute bg-[#c60004] rounded-full text-xs w-4 h-4 flex items-center justify-center top-[12px] left-[9px]">
                    5
                  </span>
                </i>
                <span className="text-sm">Giỏ hàng</span>
              </Link>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="categories w-[200px] bg-black bg-opacity-30 rounded-md text-white h-[40px] flex items-center pl-3">
              <img className="w-[20px] h-[20px]" src={categoriesIcon} alt="" />
              <span className="text-sm ml-1 font-bold">Danh mục sản phẩm</span>
            </div>

            <div className="flex-1 hot-products bg-white rounded-md items-center flex pl-2">
              <p className="uppercase text-xs font-bold">Sản phẩm HOT:</p>

              <ul className="flex items-center">
                {hotProducts.map((product, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-2 px-2 hover:underline hover:text-[#777] transition-all ${
                      index !== hotProducts.length - 1
                        ? "border-r border-gray-300"
                        : ""
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
  );
};

export default Header;
