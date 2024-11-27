/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import AdminLayout from '../layout/AdminLayout'
import Admin from '../pages/Admin'
import Categories from '../pages/Admin/Categories'
import AddCategory from '../pages/Admin/Categories/AddCategory'
import Products from '../pages/Admin/Products'
import AddProduct from '../pages/Admin/Products/AddProducts'
import Login from '../pages/Authentication/Login'
import SignUp from '../pages/Authentication/SignUp'
import Error from '../pages/Error'
import PrivateAdminRoute from './PrivateAdminRoute'
import PrivateUserRoute from './PrivateUserRoute'

const Home = lazy(() => import('../pages/Home'))
const CartPage = lazy(() => import('../pages/Cart'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))

const router = createBrowserRouter([
  {
    path: '*',
    element: <Error />,
  },
  {
    path: '404',
    element: <Error />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/product/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <PrivateUserRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <CartPage />
            </Suspense>
          </PrivateUserRoute>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <PrivateAdminRoute>
        <AdminLayout />
      </PrivateAdminRoute>
    ),
    children: [
      {
        path: '/admin',
        element: <Admin />,
      },
      {
        path: '/admin/products',
        element: <Products />,
      },
      {
        path: '/admin/products/add',
        element: <AddProduct />,
      },
      {
        path: '/admin/categories',
        element: <Categories />,
      },
      {
        path: '/admin/categories/add',
        element: <AddCategory />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
])

export default router
