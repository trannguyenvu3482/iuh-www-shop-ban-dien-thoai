import { Formik } from 'formik'
import CardItem from '../../components/Card/CardItem'
import TextInput from '../../components/TextInput'
import CartValidationSchema from './context'
import { Dropdown } from '../../components/Select'
import { useState } from 'react'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'

import {
  useFetchCommunes,
  useFetchDistrict,
  useProvince,
} from '../../hooks/useProvince'

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
  const [provinceId, setProvinceId] = useState('01')
  const [districtId, setDistrictId] = useState('001')
  const [communeId, setCommuneId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('vnpay')
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
    <div className="mx-auto my-10 w-[600px] rounded-sm px-2 shadow-md shadow-gray-300">
      <div className="mb-4 flex w-full justify-between border-b-[1px] border-gray-300 px-4 pb-2 pt-6">
        <span className="cursor-pointer text-sm text-secondary-red">
          Tiếp tục tìm kiếm sản phẩm
        </span>
        <span className="font-bold uppercase text-gray-800">
          Giỏ hàng của bạn
        </span>
      </div>
      {/*Card Item*/}
      <div className="max-h-[700px] overflow-y-auto">
        <div>
          {[1, 2].map((item) => (
            <CardItem key={item} />
          ))}
        </div>
      </div>
      {/*Total*/}
      <div className="flex w-full justify-between px-6">
        <span className="text-md cursor-pointer font-bold text-gray-600">
          Tổng tiền
        </span>
        <span className="font-[500] uppercase text-secondary-red">
          55.798.000đ
        </span>
      </div>
      {/*Form*/}
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone_number: '',
          more_info: '',
        }}
        validationSchema={CartValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="mx-auto rounded-lg bg-white p-6"
          >
            <h3 className="text-md mb-2 font-bold uppercase">
              Thông tin khách hàng
            </h3>
            {/* Name */}
            <TextInput
              label="Họ và tên"
              name="name"
              required
              placeholder="Nhập họ và tên"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
            />
            {/* Email */}
            <div className="flex gap-4">
              <div className="flex-1">
                <TextInput
                  label="Email"
                  name="email"
                  required
                  placeholder="Nhập email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                />
              </div>
              <div className="flex-1">
                {/* Phone Number */}
                <TextInput
                  label="Số điện thoại"
                  name="phone_number"
                  required
                  placeholder="Nhập số điện thoại"
                  type="text"
                  value={values.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone_number && errors.phone_number}
                />
              </div>
            </div>
            <h3 className="text-md mt-6 font-bold uppercase">
              Phương thức nhận hàng
            </h3>
            {/* Address */}
            <p className="mb-4 text-sm text-gray-600">
              Chọn phương thức nhận hàng sẽ giúp bạn nhận được sản phẩm nhanh
              hơn
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
              required
              error={touched.more_info && errors.more_info}
            />
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Gửi
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default CartPage
