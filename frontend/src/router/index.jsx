/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import AdminLayout from '../layout/AdminLayout'
import Admin from '../pages/Admin'
import AddCategoryDetail from '../pages/Admin/Categories/AddCategory'
import AdminCategories from '../pages/Admin/Categories'
import Products from '../pages/Admin/Products'
import AddProduct from '../pages/Admin/Products/AddProducts'
import Login from '../pages/Authentication/Login'
import SignUp from '../pages/Authentication/SignUp'
import Error from '../pages/Error'

import Users from '../pages/Admin/User'
import AddUser from '../pages/Admin/User/AddUser'
import PrivateAdminRoute from './PrivateAdminRoute'
import PrivateUserRoute from './PrivateUserRoute'
import FixedLoading from '../components/FixedLoading'

const Home = lazy(() => import('../pages/Home'))
const CartPage = lazy(() => import('../pages/Cart'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))
const PaymentSuccess = lazy(() => import('../pages/PaymentSuccess'))
const Categories = lazy(() => import('../pages/Categories'))
const ProfilePage = lazy(() => import('../pages/Profile'))
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
          <Suspense fallback={<FixedLoading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/product/:id',
        element: (
          <Suspense fallback={<FixedLoading />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: '/categories/:categoryId/products',
        element: (
          <Suspense fallback={<FixedLoading />}>
            <Categories />
          </Suspense>
        ),
      },

      {
        path: '/cart',
        element: (
          <PrivateUserRoute>
            <Suspense fallback={<FixedLoading />}>
              <CartPage />
            </Suspense>
          </PrivateUserRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <PrivateUserRoute>
            <Suspense fallback={<FixedLoading />}>
              <ProfilePage />
            </Suspense>
          </PrivateUserRoute>
        ),
      },
    ],
  },
  {
    path: '/payment-success',
    element: (
      <Suspense fallback={<FixedLoading />}>
        <PaymentSuccess />
      </Suspense>
    ),
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
        element: <AdminCategories />,
      },
      {
        path: '/admin/categories/add',
        element: <AddCategoryDetail />,
      },
      {
        path: '/admin/users',
        element: <Users />,
      },
      {
        path: '/admin/users/add',
        element: <AddUser />,
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
