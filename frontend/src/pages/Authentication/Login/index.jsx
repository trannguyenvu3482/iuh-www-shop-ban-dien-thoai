import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import React from 'react'
import { FaChevronLeft, FaEnvelope, FaLock } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../assets/img/logo.png'
import TextInput from '../../../components/TextInput'
import { login } from '../../../service/apiAuthentication'
import { useUserStore } from '../../../zustand/userStore'
import { LoginSchema } from '../context'
const SignIn = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { setUser, setAccessToken, setIsAuthenticated } = useUserStore()

  const handleLogin = async (values) => {
    try {
      const { data } = await login(values.email, values.password)

      console.log(data)

      if (data.statusCode === 401) {
        enqueueSnackbar(data.message, {
          variant: 'error',
          autoHideDuration: 3000,
          preventDuplicate: true,
        })
      } else {
        setUser(data.user)
        setAccessToken(data.access_token)
        setIsAuthenticated(true)

        enqueueSnackbar(
          'Đăng nhập thành công, đang chuyển hướng đến trang chủ',
          {
            variant: 'success',
            autoHideDuration: 3000,
            preventDuplicate: true,
          },
        )

        setTimeout(() => {
          navigate('/')
        }, 3000)
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {
        variant: 'error',
        autoHideDuration: 3000,
        preventDuplicate: true,
      })
    }
  }

  return (
    <div className="pt:mt-0 mx-auto flex flex-col items-end justify-center bg-[url('/authbg.jpg')] bg-cover bg-center bg-no-repeat px-6 pt-8 md:h-screen">
      <a
        href="/"
        className="absolute left-8 top-8 flex items-center justify-center gap-1 rounded-full bg-white p-4 text-xl text-black transition-all hover:opacity-90"
      >
        <FaChevronLeft />
      </a>
      <div className="mr-20 flex w-full max-w-lg flex-col rounded-lg bg-white p-10 shadow dark:bg-gray-800">
        <a
          href="/"
          className="flex items-center justify-center text-2xl font-semibold hover:opacity-90 dark:text-white"
        >
          <img src={Logo} className="mr-4 h-11" alt="FlowBite Logo" />
        </a>
        <h2 className="mb-8 mt-1 text-center text-lg text-gray-200 opacity-60">
          Chào mừng bạn quay trở lại!
        </h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            handleLogin(values)
          }}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form>
              <TextInput
                labelStyle="text-white"
                label="Email của bạn"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                iconLeft={<FaEnvelope />}
                error={errors.email && touched.email ? errors.email : ''}
              />
              <TextInput
                labelStyle="text-white"
                label="Mật khẩu của bạn"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                iconLeft={<FaLock />}
                error={
                  errors.password && touched.password ? errors.password : ''
                }
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
                className="mt-4 w-full rounded-md bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Đăng nhập
              </button>
              <div className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                Chưa có tài khoản?{' '}
                <Link
                  to="/signup"
                  className="text-primary-700 dark:text-primary-500 cursor-pointer hover:underline"
                >
                  Tạo tài khoản
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SignIn
