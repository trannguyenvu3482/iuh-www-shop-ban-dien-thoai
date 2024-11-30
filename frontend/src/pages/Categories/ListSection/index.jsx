import CardProduct from '../../../components/Card/CardProduct'
import { formatVND } from '../../../utils/format'
function generateRandomArray(length) {
  const arr = []
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 20) + 1)
  }
  return arr
}

function ListSection({ dataList }) {
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {dataList?.map((product) => (
          <div key={product.id} className="w-1/5-gap-4">
            <CardProduct
              chips={
                generateRandomArray(20).find((num) => num === product.id) && [
                  {
                    label: 'Trả góp 0%',
                    color: 'basic',
                  },
                  {
                    label: `Giảm giá lên đến ${product.discount} %`,
                    color: 'primary',
                  },
                ]
              }
              isBorder={true}
              imgURL={product.thumbnailUrl}
              name={product.name}
              price={formatVND(product.basePrice)}
              oldPrice={formatVND(product.basePrice + product.basePrice * 0.2)}
              initPayment={formatVND(
                product.basePrice - product.basePrice * 0.5,
              )}
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
