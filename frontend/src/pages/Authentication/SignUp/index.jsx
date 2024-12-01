import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import React from 'react'
import {
  FaChevronLeft,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
} from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../assets/img/logo.png'
import TextInput from '../../../components/TextInput'
import { useUserStore } from '../../../zustand/userStore'
import { SignUpSchema } from '../context'
import { addUser } from '../../../service/apiUser'
const SignUp = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { setUser, setAccessToken, setIsAuthenticated } = useUserStore()

  const handleSignUp = async (values) => {
    console.log(values)

    const data = await addUser(values)
    if (data.statusCode >= 400 && data.statusCode < 500) {
      console.log(data)
      enqueueSnackbar(data.message, {
        variant: 'error',
        autoHideDuration: 3000,
        preventDuplicate: true,
      })
      return
    }
    enqueueSnackbar(
      'Đăng ký thành công, đang chuyển hướng đến trang đăng nhập',
      {
        variant: 'success',
      },
    )
    navigate('/login')
    return
    // if (data.statusCode === 401) {
    //   enqueueSnackbar(data.message, {
    //     variant: 'error',
    //     autoHideDuration: 3000,
    //     preventDuplicate: true,
    //   })
    // } else {
    //   setUser(data.user)
    //   setAccessToken(data.accessToken)
    //   setIsAuthenticated(true)

    //   enqueueSnackbar('Đăng nhập thành công, đang chuyển hướng đến trang chủ', {
    //     variant: 'success',
    //     autoHideDuration: 3000,
    //     preventDuplicate: true,
    //   })
    //   setTimeout(() => {
    //     navigate('/')
    //   }, 3000)
    // }
  }

  return (
    <div className="pt:mt-0 mx-auto flex flex-col items-end justify-center bg-[url('/authbg.jpg')] bg-cover bg-center bg-no-repeat px-6 pt-8 md:h-screen">
      <a
        href="/"
        className="absolute left-8 top-8 flex items-center justify-center gap-1 rounded-full bg-white p-4 text-xl text-black transition-all hover:opacity-90"
      >
        <FaChevronLeft />
      </a>
      <div className="mr-20 flex w-full max-w-lg flex-col rounded-lg bg-gray-800 px-10 py-6 shadow">
        <a
          href="/"
          className="flex items-center justify-center text-2xl font-semibold hover:opacity-90 dark:text-white"
        >
          <img src={Logo} className="mr-4 h-11" alt="FlowBite Logo" />
        </a>
        <h2 className="mb-6 mt-2 text-center text-lg text-gray-200 opacity-60">
          Đăng ký tài khoản để bắt đầu mua hàng
        </h2>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            passwordRepeat: '',
            phoneNumber: '',
            gender: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            handleSignUp(values)
          }}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form>
              <div className="flex justify-between">
                <TextInput
                  labelStyle="text-white"
                  label="Họ và tên"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name && touched.name ? errors.name : ''}
                  containerStyle="w-[230px]"
                  iconLeft={<FaUser />}
                />

                <div className="flex flex-col justify-normal">
                  <h3 className="mb-2 text-sm font-semibold text-white">
                    Giới tính
                  </h3>
                  <ul className="flex w-full items-center rounded-lg border border-gray-600 bg-gray-700 text-sm font-medium text-white">
                    <li className="w-full">
                      <div className="flex items-center border-r border-r-gray-600 px-1.5">
                        <input
                          id="horizontal-list-radio-id"
                          type="radio"
                          value="MALE"
                          name="gender"
                          onBlur={handleBlur}
                          onClick={handleChange}
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                        />
                        <label
                          htmlFor="horizontal-list-radio-id"
                          className="ms-1.5 w-full py-[10px] text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Nam
                        </label>
                      </div>
                    </li>
                    <li className="h-full w-full">
                      <div className="flex items-center border-r border-r-gray-600 px-1.5">
                        <input
                          id="horizontal-list-radio-military"
                          type="radio"
                          value="FEMALE"
                          name="gender"
                          onClick={handleChange}
                          onBlur={handleBlur}
                          className="h-4 w-4 border-gray-500 bg-gray-600 ring-offset-gray-700 focus:ring-blue-600 focus:ring-offset-gray-700"
                        />
                        <label
                          htmlFor="horizontal-list-radio-military"
                          className="ms-1.5 w-full py-[10px] text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Nữ
                        </label>
                      </div>
                    </li>
                    <li className="w-full">
                      <div className="flex items-center px-1.5">
                        <input
                          id="horizontal-list-radio-passport"
                          type="radio"
                          value="OTHER"
                          name="gender"
                          onClick={handleChange}
                          onBlur={handleBlur}
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                        />
                        <label
                          htmlFor="horizontal-list-radio-passport"
                          className="ms-1.5 w-full py-[10px] text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Khác
                        </label>
                      </div>
                    </li>
                  </ul>
                  {errors.gender && touched.gender ? (
                    <p className="mt-2 text-sm text-red-600">{errors.gender}</p>
                  ) : null}
                </div>
              </div>
              <TextInput
                labelStyle="text-white"
                label="Email của bạn"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email ? errors.email : ''}
                iconLeft={<FaEnvelope />}
              />
              <TextInput
                labelStyle="text-white"
                label="Mật khẩu của bạn"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.password && touched.password ? errors.password : ''
                }
                iconLeft={<FaLock />}
              />
              <TextInput
                labelStyle="text-white"
                label="Nhập lại mật khẩu của bạn"
                name="passwordRepeat"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.passwordRepeat && touched.passwordRepeat
                    ? errors.passwordRepeat
                    : ''
                }
                iconLeft={<FaLock />}
              />
              <TextInput
                labelStyle="text-white"
                label="Số điện thoại"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  errors.phoneNumber && touched.phoneNumber
                    ? errors.phoneNumber
                    : ''
                }
                iconLeft={<FaPhone />}
              />
              <div className="my-4 flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    name="remember"
                    type="checkbox"
                    className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="font-medium text-gray-900 dark:text-white"
                  >
                    Nhớ mật khẩu
                  </label>
                </div>
                <a
                  href="#"
                  className="dark:text-primary-500 ml-auto text-sm text-white hover:underline"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-md bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Đăng ký
              </button>
              <div className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                Đã có tài khoản?{' '}
                <Link
                  to="/login"
                  className="text-primary-700 dark:text-primary-500 cursor-pointer hover:underline"
                >
                  Đăng nhập ngay
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SignUp
