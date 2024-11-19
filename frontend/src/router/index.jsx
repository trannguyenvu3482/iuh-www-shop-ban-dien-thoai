/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Admin from '../pages/Admin'
import Login from '../pages/Authentication/Login'
import SignUp from '../pages/Authentication/SignUp'
import Error from '../pages/Error'
import ProductDetail from '../pages/ProductDetail'
import PrivateRoute from './PrivateRoute'
const Home = lazy(() => import('../pages/Home'))

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
    ],
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
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
