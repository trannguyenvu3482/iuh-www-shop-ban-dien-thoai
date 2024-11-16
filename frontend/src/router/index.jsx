/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Error from '../pages/Error'
import ProductDetail from '../pages/ProductDetail'
const Home = lazy(() => import('../pages/Home'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
    ],
  },
])

export default router
