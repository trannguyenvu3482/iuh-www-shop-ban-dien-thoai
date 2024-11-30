import { useState } from 'react'
import useUrl from '../../hooks/ui/useUrl'
import BannerCategories from './Banner'
import Chip from '../../components/Chip'
import ListSection from './ListSection'
import { useProductsByCategory } from '../../hooks/useProduct'
import ProductSkeleton from '../../components/ProductSkeleton'
const FILTER_CATEGORIES = [
  {
    label: 'Nổi bật nhất',
    value: '1',
  },
  {
    label: 'Phổ biến nhất',
    value: '2',
  },
  {
    label: 'Giá thấp đến cao',
    value: '3',
  },
  {
    label: 'Giá cao đến thấp',
    value: '4',
  },
]
const getFilterProducts = (sortIndex, products) => {
  if (!products) {
    return []
  }
  switch (sortIndex) {
    case '1':
      return products.sort((a, b) => a.rating - b.rating)
    case '2':
      return products.sort((a, b) => a.totalStock - b.totalStock)
    case '3':
      return products.sort((a, b) => a.basePrice - b.basePrice)
    case '4':
      return products.sort((a, b) => b.basePrice - a.basePrice)
    default:
      return products
  }
}
function Categories() {
  const { setTypeSort } = useUrl()

  const { products, isLoading } = useProductsByCategory()
  const [filter, setFilter] = useState('0')

  return (
    <div className="m-auto max-w-[100vw] bg-white">
      <div className="mx-auto w-[1220px] px-4 pb-8 pt-2">
        <BannerCategories />

        <div className="mt-4">
          {FILTER_CATEGORIES.map((fillItem, index) => (
            <Chip
              key={index}
              className={`${filter == fillItem.value && '!bg-primary-red !text-white'}`}
              type="button"
              color="basic"
              onClick={() => {
                setFilter(fillItem.value)
                setTypeSort(fillItem.value)
              }}
              label={fillItem.label}
            />
          ))}
        </div>

        <div className="mt-6">
          <h1 className="mb-2 font-bold text-slate-600">
            iPhone 14 | 14 Plus | 14 Pro | 14 Pro Max
          </h1>
          {isLoading ? (
            <ProductSkeleton />
          ) : (
            <ListSection
              dataList={
                products !== null ? getFilterProducts(filter, products) : []
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories
