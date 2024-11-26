/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import AdminLayout from '../layout/AdminLayout'
import Admin from '../pages/Admin'
import Products from '../pages/Admin/Products'
import AddProduct from '../pages/Admin/Products/AddProducts'
import Login from '../pages/Authentication/Login'
import SignUp from '../pages/Authentication/SignUp'
import Error from '../pages/Error'
import PrivateRoute from './PrivateRoute'
import Categories from '../pages/Admin/Categories'
import AddCategory from '../pages/Admin/Categories/AddCategory'

const Home = lazy(() => import('../pages/Home'))
const CartPage = lazy(() => import('../pages/Cart'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
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
