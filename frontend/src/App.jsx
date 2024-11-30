import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const App = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
