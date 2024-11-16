import CardProduct from '../../../components/Card/CardProduct'
import CategoryBar from '../CategoryBar'

function ListSection({ dataList, title, categories }) {
  return (
    <div>
      <CategoryBar categories={categories} title={title} />
      <div className="flex flex-wrap gap-4">
        {dataList.map((product) => (
          <div key={product.productId} className="w-1/5-gap-4">
            <CardProduct
              imgURL={product.imgURL}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              initPayment={product.initPayment}
              rating={product.rating}
              productId={product.productId}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListSection
