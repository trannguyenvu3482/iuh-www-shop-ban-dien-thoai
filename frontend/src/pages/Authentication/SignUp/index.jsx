import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../assets/img/logo.png'
import TextInput from '../../../components/TextInput'
import { LoginSchema } from '../context'

const SignUp = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  return (
    <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center bg-[url('https://plus.unsplash.com/premium_photo-1701167435570-8c3239951f74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] px-6 pt-8 md:h-screen">
      <div className="flex w-full max-w-2xl flex-col rounded-lg bg-white p-10 shadow dark:bg-gray-800">
        <a
          href="/"
          className="flex items-center justify-center text-2xl font-semibold dark:text-white"
        >
          <img src={Logo} className="mr-4 h-11" alt="FlowBite Logo" />
        </a>
        <h2 className="mb-8 mt-2 text-center text-lg text-gray-200 opacity-60">
          Đăng ký tài khoản của bạn để bắt đầu mua hàng
        </h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(values)
            navigate('/')
          }}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form>
              <TextInput
                label="Email của bạn"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email && touched.email ? errors.email : ''}
              />
              <TextInput
                label="Mật khẩu của bạn"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
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
                Đã có tài khoản?{' '}
                <Link
                  to="/login"
                  className="text-primary-700 dark:text-primary-500 cursor-pointer hover:underline"
                >
                  Đăng nhập
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
