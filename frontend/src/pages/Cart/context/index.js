import * as Yup from 'yup'

const CartValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Vui lòng nhập tên')
    .min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  phone_number: Yup.string()
    .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ')
    .required('Vui lòng nhập số điện thoại'),
  more_info: Yup.string().required('Vui lòng nhập số nhà, đường chi tiết'),
})

export default CartValidationSchema
