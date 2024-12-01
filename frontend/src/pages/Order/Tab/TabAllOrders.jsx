import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getOrdersByUser } from '../../../service/apiUser'
// import useUrl from '../../../hooks/ui/useUrl'
import useMe from '../../../hooks/useMe'
const OrderCard = ({ order }) => {
  const shippingAddress = JSON.parse(
    order?.shippingAddress ? order.shippingAddress : '{}',
  )

  return (
    <div className="mx-auto my-2 w-full max-w-full rounded-lg bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-2xl">
      <div className=" border-b pb-2">
        <h2 className="text-xl font-semibold text-slate-600">
          Order: <span className="text-red-500">{order?.orderCode}</span>
        </h2>
        <p className="text-sm text-gray-500">Mã đơn hàng: {order?.id}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Mô tả đơn hàng
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <strong className="font-medium text-gray-800">
                Trạng thái đơn hàng:
              </strong>
              <span
                className={`text-${order?.status === 'Đang xử lý' ? 'red' : 'green'}-500`}
              >
                {order?.status}
              </span>
            </li>
            <li>
              <strong className="font-medium text-gray-800">
                Phương thức thanh toán:
              </strong>{' '}
              {order?.paymentMethod}
            </li>
            <li>
              <strong className="font-medium text-gray-800">
                Ngày tạo đơn:
              </strong>{' '}
              {new Date(order?.createdAt).toLocaleString()}
            </li>
            <li>
              <strong className="font-medium text-gray-800">
                Ngày ship hàng:
              </strong>{' '}
              {new Date(order?.shippingDate).toLocaleString()}
            </li>
            <li>
              <strong className="font-medium text-gray-800">
                Ghi chú đơn hàng:
              </strong>{' '}
              {order?.note}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            Địa chỉ nhận hàng
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <strong className="font-medium text-gray-800">Thành phố:</strong>{' '}
              {shippingAddress?.province?.name}
            </li>
            <li>
              <strong className="font-medium text-gray-800">
                Quận/ huyện:
              </strong>{' '}
              {shippingAddress?.district?.name}
            </li>
            <li>
              <strong className="font-medium text-gray-800">
                Thông tin khác:
              </strong>{' '}
              {shippingAddress?.more_info}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-700">Tổng hóa đơn</h3>
        <p className="text-xl font-semibold text-orange-600">
          {order?.totalPrice?.toLocaleString()} VND
        </p>
      </div>
    </div>
  )
}

function TabAllOrders() {
  const { me } = useMe()
  // const { setTypeSort, setTypeFilter } = useUrl()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const handlerFetchSortFilter = async () => {
    try {
      setLoading(true)
      const res = await getOrdersByUser(me.id, 'createdAt,desc')
      setOrders(res.data.result)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    handlerFetchSortFilter()
  }, [])
  return (
    <Box>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Box>
          <div className="container p-6">
            {orders?.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </Box>
      )}
    </Box>
  )
}

export default TabAllOrders
