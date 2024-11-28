import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { formatVND } from '../../utils/format'

const SearchBar = ({
  searchValue,
  setSearchValue,
  listProducts = [],
  setListProducts,
}) => {
  const navigate = useNavigate()

  const handleSelect = (id) => {
    setSearchValue('')
    setListProducts([])
    navigate(`/product/${id}`)
  }

  return (
    <div className="search group relative ml-6 flex h-[40px] w-[440px] rounded-md bg-white pl-2 focus-within:border focus-within:border-black">
      <button>
        <IoSearchOutline className="h-7 w-7" />
      </button>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="ml-2 mr-2 w-full rounded-md border-none text-xs outline-none placeholder:text-gray-500"
        type="text"
        placeholder="Bạn muốn tìm gì ?"
      />

      {listProducts && listProducts.length > 0 && (
        <div className="search-result click absolute left-0 top-10 z-10 mt-1 hidden max-h-[300px] w-full overflow-y-scroll rounded-md bg-white p-1 shadow-lg group-focus-within:block">
          {listProducts.map((product) => (
            <button
              onClick={() => handleSelect(product.id)}
              className="w-full"
              key={product.id}
            >
              <div className="flex items-center border-b border-gray-100 px-4 py-2 hover:bg-gray-100">
                <img className="h-10 w-10" src={product.thumbnailUrl} alt="" />
                <div className="ml-2 flex flex-col items-start justify-start">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-md font-bold text-red-500">
                    {formatVND(product.basePrice)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
