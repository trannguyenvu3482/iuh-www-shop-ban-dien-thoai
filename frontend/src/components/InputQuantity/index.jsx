import { useEffect, useState } from 'react'

const InputQuantity = ({ toggleCounting, initCount }) => {
  const [count, setCount] = useState(initCount)
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }
  const handleIncrement = () => {
    setCount(count + 1)
  }
  useEffect(() => {
    toggleCounting(count)
  }, [count])
  return (
    <div className="flex h-10 items-center overflow-hidden rounded-md border border-gray-300">
      <button
        onClick={handleDecrement}
        className="border-r border-gray-300 px-3 py-2 text-sm hover:bg-gray-200"
      >
        -
      </button>
      <div className="px-4 py-2 text-sm font-medium">{count}</div>
      <button
        onClick={handleIncrement}
        className="border-l border-gray-300 px-3 py-2 text-sm hover:bg-gray-200"
      >
        +
      </button>
    </div>
  )
}

export default InputQuantity
