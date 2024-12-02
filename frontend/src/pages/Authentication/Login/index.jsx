import { Form, Formik } from 'formik'
import { FaChevronLeft, FaEnvelope, FaLock } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/img/logo.png'
import TextInput from '../../../components/TextInput'
import { LoginSchema } from '../context'
import useMe from '../../../hooks/useMe'
const SignIn = () => {
  const { handleLogin } = useMe()

  return (
    <div className="pt:mt-0 mx-auto flex flex-col items-end justify-center bg-[url('/authbg.jpg')] bg-cover bg-center bg-no-repeat px-6 pt-8 md:h-screen">
      <a
        href="/"
        className="absolute left-8 top-8 flex items-center justify-center gap-1 rounded-full bg-white p-4 text-xl text-black transition-all hover:opacity-90"
      >
        <FaChevronLeft />
      </a>
      <div className="mr-20 flex w-full max-w-lg flex-col rounded-lg bg-gray-800 p-10 shadow">
        <a
          href="/"
          className="flex items-center justify-center text-2xl font-semibold text-white hover:opacity-90"
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
                    className="focus:ring-3 focus:ring-primary-300 focus:ring-primary-600 h-4 w-4 rounded border-gray-300 border-gray-600 bg-gray-50 bg-gray-700 ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="font-medium text-gray-900 text-white"
                  >
                    Nhớ mật khẩu
                  </label>
                </div>
                <a
                  href="#"
                  className="text-primary-500 ml-auto text-sm text-white hover:underline"
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
              <div className="mt-3 text-sm font-medium text-gray-400 text-gray-500">
                Chưa có tài khoản?{' '}
                <Link
                  to="/signup"
                  className="text-primary-700 text-primary-500 cursor-pointer hover:underline"
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
