import { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const InputQuantity = ({ toggleCounting, initCount }) => {
  const [count, setCount] = useState(initCount)
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1)
      toggleCounting(count - 1, 'decrease')
    }
  }
  const handleIncrement = () => {
    setCount(count + 1)
    toggleCounting(count + 1, 'increase')
  }
  useEffect(() => {
    toggleCounting(count)
  }, [count])
  
  return (
    <div className="flex h-8 items-center overflow-hidden rounded-md border border-gray-300">
      <button
        onClick={handleDecrement}
        className="h-full border-r border-gray-300 px-3 py-1 text-sm hover:bg-gray-200"
      >
        <FaMinus className="h-2.5 w-2.5" />
      </button>
      <div className="px-4 py-1 text-sm font-medium">{count}</div>
      <button
        onClick={handleIncrement}
        className="h-full border-l border-gray-300 px-3 py-1 text-sm hover:bg-gray-200"
      >
        <FaPlus className="h-2.5 w-2.5" />
      </button>
    </div>
  )
}

export default InputQuantity
