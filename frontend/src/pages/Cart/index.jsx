import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import CardItem from '../../components/Card/CardItem'
import { Dropdown } from '../../components/Select'
import TextInput from '../../components/TextInput'
import CartValidationSchema from './context'

import { FaCoins, FaSearch } from 'react-icons/fa'
import { FaTicket } from 'react-icons/fa6'
import {
  useFetchCommunes,
  useFetchDistrict,
  useProvince,
} from '../../hooks/useProvince'
import useMe from '../../hooks/useMe'
import { formatVND } from '../../utils/format'

const convertProvince = (provinces) => {
  if (!provinces || provinces === undefined || provinces === null) return []
  return provinces?.map((p) => {
    return {
      label: p.name,
      value: p.idProvince,
    }
  })
}
const convertDistrict = (provinces) => {
  if (!provinces) return []
  return provinces?.map((p) => {
    return {
      label: p.name,
      value: p.idDistrict,
    }
  })
}

const convertCommune = (provinces) => {
  if (!provinces) return []
  return provinces?.map((p) => {
    return {
      label: p.name,
      value: p.idCommune,
    }
  })
}
const convertAddress = (
  more_info,
  provinceId,
  districtId,
  communeId,
  provinces,
  districts,
  communes,
) => {
  const province = provinces.find((p) => p.idProvince === provinceId)
  const district = districts.find((d) => d.idDistrict === districtId)
  const commune = communes.find((c) => c.idCommune === communeId)

  const address = {
    province: {
      name: province?.name,
      id: province?.idProvince,
    },
    district: {
      name: district?.name,
      id: district?.idDistrict,
    },
    commune: {
      name: commune?.name,
      id: commune?.idCommune,
    },
    more_info: more_info,
  }

  return JSON.stringify(address)
}

function CartPage() {
  const { cartDetails, totalPrice, me } = useMe()

  const [provinceId, setProvinceId] = useState('01')
  const [districtId, setDistrictId] = useState('001')
  const [communeId, setCommuneId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('vnpay')
  const [code, setCode] = useState('')
  const provinces = useProvince()
  const districts = useFetchDistrict(provinceId)
  const communes = useFetchCommunes(districtId)

  const handleSelectProvince = (e) => {
    setProvinceId(e.target.value)
  }
  const handleSelectDistrict = (e) => {
    setDistrictId(e.target.value)
  }
  const handleSelectCommune = (e) => {
    setCommuneId(e.target.value)
  }
  const handleSelectPaymentMethod = (methodName) => {
    setPaymentMethod(methodName)
  }
  const handleSubmit = (values) => {
    const addressJSON = convertAddress(
      values.more_info,
      provinceId,
      districtId,
      communeId,
      provinces,
      districts,
      communes,
    )

    const data = {
      name: values.name,
      email: values.email,
      phone_number: values.phone_number,
      address: addressJSON,
    }
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <Formik
      initialValues={{
        name: me?.name,
        email: me?.email,
        phone_number: me?.phoneNumber,
        more_info: '',
      }}
      validationSchema={CartValidationSchema}
      onSubmit={(values) => handleSubmit(values)}
      enableReinitialize={true}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
        <form
          onSubmit={handleSubmit}
          className="flex h-full w-full items-center justify-center bg-gray-100"
        >
          <div className="my-10 flex w-[1200px] flex-col px-2">
            <div className="grid w-full grid-cols-[2fr_1fr] gap-4">
              {/* Left Side */}
              <div className="rounded-2xl bg-white p-6">
                <div className="">
                  <div className="mb-4 flex w-full justify-between pb-2">
                    <span className="font-bold uppercase text-gray-800">
                      Giỏ hàng của bạn
                    </span>
                    <a
                      href="/"
                      className="cursor-pointer text-sm text-primary-red hover:text-red-800"
                    >
                      Tiếp tục tìm kiếm sản phẩm
                    </a>
                  </div>
                  {/*Card Item*/}
                  <div className="max-h-[700px] overflow-y-auto">
                    <div>
                      {cartDetails.map((cartItemValue) => (
                        <CardItem
                          key={cartItemValue.id}
                          cartItemValue={cartItemValue}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="my-4 flex w-full border-b-[1px] border-gray-300 pb-2">
                  <span className="font-bold uppercase text-gray-800">
                    Thông tin khách hàng
                  </span>
                </div>
                {/* Name */}
                <TextInput
                  inputStyle="!text-gray-400"
                  disabled
                  label="Họ và tên"
                  name="name"
                  required
                  placeholder="Nhập họ và tên"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                />
                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <TextInput
                      inputStyle="!text-gray-400"
                      disabled
                      label="Địa chỉ email"
                      name="email"
                      required
                      placeholder="Nhập email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.email}
                    />
                  </div>
                  <div className="flex-1">
                    {/* Phone Number */}
                    <TextInput
                      inputStyle="!text-gray-400"
                      disabled
                      label="Số điện thoại"
                      name="phone_number"
                      required
                      placeholder="Nhập số điện thoại"
                      type="text"
                      value={values.phone_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.phone_number}
                    />
                  </div>
                </div>

                <Dropdown
                  label={'Tỉnh/thành phố'}
                  required
                  data={convertProvince(provinces)}
                  onChange={(e) => handleSelectProvince(e)}
                />
                <Dropdown
                  required
                  label={'Quận/huyện'}
                  data={convertDistrict(districts)}
                  onChange={(e) => handleSelectDistrict(e)}
                />
                <Dropdown
                  label={'Xã/phường'}
                  required
                  data={convertCommune(communes)}
                  onChange={(e) => handleSelectCommune(e)}
                />
                <TextInput
                  label="Số nhà, tên đường"
                  name="more_info"
                  placeholder="Nhập địa chỉ"
                  value={values.more_info}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.more_info}
                />
                {/* Submit Button */}
              </div>

              {/* Right Side */}
              <div className="flex h-[580px] w-full flex-col justify-between rounded-2xl">
                <div className="flex-1 rounded-t-2xl bg-white p-6 pb-0">
                  <div>
                    <h3 className="text-md font-bold uppercase">
                      Phương thức thanh toán
                    </h3>
                    {/* Address */}
                    <p className="mb-4 text-sm text-gray-600">
                      Chọn phương thức thanh toán sẽ giúp bạn nhận được sản phẩm
                      nhanh hơn
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleSelectPaymentMethod('vnpay')}
                        className={`${paymentMethod === 'vnpay' ? 'border-2 border-green-300 bg-green-100 shadow-lg' : 'bg-slate-100'} mb-6 h-20 w-20 rounded-md border-2 border-gray-200 px-4 py-2 text-center align-middle`}
                      >
                        <img
                          className="h-14 w-20 flex-1 object-contain"
                          src="https://i.gyazo.com/4914b35ab9381a3b5a1e7e998ee9550c.png"
                        />
                      </button>
                      <button
                        onClick={() => handleSelectPaymentMethod('cash')}
                        className={`${paymentMethod === 'cash' ? 'border-2 border-green-300 bg-green-100 shadow-lg' : 'bg-slate-100'} mb-6 h-20 w-20 rounded-md border-2 border-gray-200 px-4 py-2 text-center align-middle`}
                      >
                        <MdOutlineAccountBalanceWallet
                          className={`h-10 w-12 flex-1 object-contain ${paymentMethod === 'cash' ? 'font-bold text-green-500' : 'text-gray-600'}`}
                        />
                        <span
                          className={`${paymentMethod === 'cash' ? 'font-bold text-green-500' : 'text-gray-600'} text-[11px]`}
                        >
                          Tiền mặt
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <TextInput
                      name="code"
                      containerStyle="!mb-0 flex-1"
                      placeholder="Nhập mã giảm giá nếu có"
                      iconLeft={<FaTicket className="h-4 w-4 text-red-600" />}
                      maxLength={10}
                      onChange={(e) => setCode(e.target.value)}
                      value={code}
                    />
                    <button className="flex h-[42px] w-[42px] items-center justify-center rounded-lg bg-red-600 text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300">
                      <FaSearch />
                    </button>
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    <p className="text-textOnWhitePrimary font-semibold">
                      Thông tin đơn hàng
                    </p>
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm">Tổng tiền</p>
                      <div className="font-semibold">
                        {formatVND(totalPrice)} &nbsp;₫
                      </div>
                    </div>
                    <div className="border-neutral-gray-3 block h-0 w-full border-b after:content-['']"></div>
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm">Tổng khuyến mãi</p>
                      <div className="font-semibold">0&nbsp;₫</div>
                    </div>
                    <div className="border-neutral-gray-3 block h-0 w-full border-b border-dashed after:content-['']"></div>
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm">Cần thanh toán</p>
                      <div className="font-bold text-primary-red">
                        {formatVND(totalPrice)} &nbsp;₫
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <p className="!b2-regular text-sm">Điểm tích lũy</p>
                      <div className="b2-regular text-textOnWhitePrimary">
                        <div className="flex items-center gap-0.5">
                          {' '}
                          <span className="flex items-center gap-1">
                            <FaCoins color="gold" />{' '}
                            {parseFloat(totalPrice / 4000).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 w-full rounded-lg bg-red-600 p-4 text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      Xác nhận đơn hàng
                    </button>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="403"
                  height="28"
                  viewBox="0 0 403 28"
                  fill="#fff"
                  className="w-full"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0H403V18.8171C403 21.7846 403 23.2683 402.487 24.4282C401.883 25.7925 400.792 26.8829 399.428 27.4867C398.268 28 396.785 28 393.817 28C391.534 28 390.392 28 389.652 27.808C388.208 27.4337 388.419 27.5431 387.28 26.579C386.696 26.0846 385.116 23.845 381.954 19.3656C379.649 16.0988 376.065 14 372.04 14C367.06 14 362.756 17.2133 360.712 21.8764C359.949 23.6168 359.568 24.487 359.531 24.5647C358.192 27.3971 357.411 27.9078 354.279 27.9975C354.193 28 353.845 28 353.15 28C352.454 28 352.107 28 352.021 27.9975C348.889 27.9078 348.107 27.3971 346.768 24.5647C346.731 24.487 346.35 23.6168 345.587 21.8765C343.544 17.2133 339.239 14 334.259 14C329.279 14 324.974 17.2133 322.931 21.8764C322.168 23.6168 321.787 24.487 321.75 24.5647C320.411 27.3971 319.629 27.9078 316.498 27.9975C316.412 28 316.064 28 315.368 28C314.673 28 314.325 28 314.239 27.9975C311.108 27.9078 310.326 27.3971 308.987 24.5647C308.95 24.487 308.569 23.6168 307.806 21.8765C305.763 17.2133 301.458 14 296.478 14C291.498 14 287.193 17.2133 285.15 21.8764C284.387 23.6168 284.005 24.487 283.969 24.5647C282.63 27.3971 281.848 27.9078 278.716 27.9975C278.63 28 278.283 28 277.587 28C276.892 28 276.544 28 276.458 27.9975C273.326 27.9078 272.545 27.3971 271.206 24.5647C271.169 24.487 270.788 23.6168 270.025 21.8765C267.981 17.2133 263.677 14 258.697 14C253.717 14 249.412 17.2133 247.368 21.8764C246.606 23.6168 246.224 24.487 246.188 24.5647C244.848 27.3971 244.067 27.9078 240.935 27.9975C240.849 28 240.501 28 239.806 28C239.111 28 238.763 28 238.677 27.9975C235.545 27.9078 234.764 27.3971 233.424 24.5647C233.388 24.487 233.006 23.6168 232.244 21.8765C230.2 17.2133 225.895 14 220.915 14C215.935 14 211.631 17.2133 209.587 21.8764C208.824 23.6168 208.443 24.487 208.406 24.5647C207.067 27.3971 206.286 27.9078 203.154 27.9975C203.068 28 202.72 28 202.025 28C201.329 28 200.982 28 200.896 27.9975C197.764 27.9078 196.982 27.3971 195.643 24.5647C195.606 24.487 195.225 23.6168 194.462 21.8765C192.419 17.2133 188.114 14 183.134 14C178.154 14 173.849 17.2133 171.806 21.8764C171.043 23.6168 170.662 24.487 170.625 24.5647C169.286 27.3971 168.504 27.9078 165.373 27.9975C165.287 28 164.939 28 164.243 28C163.548 28 163.2 28 163.114 27.9975C159.983 27.9078 159.201 27.3971 157.862 24.5647C157.825 24.487 157.444 23.6168 156.681 21.8765C154.638 17.2133 150.333 14 145.353 14C140.373 14 136.068 17.2133 134.025 21.8764C133.262 23.6168 132.881 24.487 132.844 24.5647C131.505 27.3971 130.723 27.9078 127.591 27.9975C127.505 28 127.158 28 126.462 28C125.767 28 125.419 28 125.333 27.9975C122.201 27.9078 121.42 27.3971 120.081 24.5647C120.044 24.487 119.663 23.6168 118.9 21.8764C116.856 17.2133 112.552 14 107.572 14C102.592 14 98.2868 17.2133 96.2433 21.8764C95.4806 23.6168 95.0993 24.487 95.0625 24.5647C93.7233 27.3971 92.9418 27.9078 89.8101 27.9975C89.7242 28 89.3765 28 88.681 28C87.9855 28 87.6378 28 87.5519 27.9975C84.4201 27.9078 83.6386 27.3971 82.2994 24.5647C82.2627 24.487 81.8814 23.6168 81.1187 21.8764C79.0752 17.2133 74.7703 14 69.7904 14C64.8104 14 60.5056 17.2133 58.462 21.8764C57.6993 23.6168 57.318 24.487 57.2813 24.5647C55.9421 27.3971 55.1606 27.9078 52.0289 27.9975C51.943 28 51.5952 28 50.8997 28C50.2043 28 49.8565 28 49.7706 27.9975C46.6389 27.9078 45.8574 27.3971 44.5182 24.5647C44.4815 24.487 44.1001 23.6168 43.3375 21.8764C41.2939 17.2133 36.9891 14 32.0091 14C28.1447 14 24.6868 15.9349 22.3767 18.9808C18.6745 23.8618 16.8235 26.3024 16.1428 26.81C15.1528 27.5482 15.4074 27.4217 14.2211 27.7644C13.4053 28 12.1727 28 9.70768 28C6.25895 28 4.53458 28 3.23415 27.3245C2.13829 26.7552 1.24477 25.8617 0.675519 24.7658C0 23.4654 0 21.7569 0 18.34V0Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default CartPage
