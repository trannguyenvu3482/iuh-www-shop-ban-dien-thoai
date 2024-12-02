import CardProduct from '../../../components/Card/CardProduct'
import { useProductsByHome } from '../../../hooks/useProduct'
import CategoryBar from '../CategoryBar'
import { formatVND } from '../../../utils/format'
function ListSection({ dataList, title, categories }) {
  const { products } = useProductsByHome()

  return (
    <div>
      <CategoryBar categories={categories} title={title} />
      <div className="flex flex-wrap gap-4">
        {products?.map((product) => (
          <div key={product.id} className="w-1/5-gap-4">
            <CardProduct
              imgURL={product.thumbnailUrl}
              name={product.name}
              price={formatVND(product.basePrice)}
              oldPrice={formatVND(product.basePrice + product.basePrice * 0.4)}
              initPayment={`${formatVND(product.basePrice - product.basePrice * 0.4)} đ`}
              rating={product.rating}
              productId={product.id}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListSection
