import { useState, useEffect } from 'react'

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
          className="fixed bottom-4 right-4 h-10 w-10 cursor-pointer rounded-md leading-4 bg-primary-red p-3 text-center text-white shadow-lg transition duration-300 hover:bg-orange-600"
        >
          ↑
        </div>
      )}
    </div>
  )
}
