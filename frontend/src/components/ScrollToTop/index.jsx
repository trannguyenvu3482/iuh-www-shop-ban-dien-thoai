import { useEffect, useState } from 'react'
import { FaChevronUp } from 'react-icons/fa6'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm border border-primary-red bg-primary-red p-3 text-center leading-4 text-white shadow-lg transition duration-300 hover:bg-white hover:text-primary-red"
        >
          <FaChevronUp />
        </div>
      )}
    </div>
  )
}
