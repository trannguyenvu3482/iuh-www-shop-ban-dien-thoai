import { useEffect } from 'react'
import useUrl from '../../hooks/ui/useUrl'
import { formatVND } from '../../utils/format'
import { putOrderStatus } from '../../service/apiOrder'
import { MdError } from 'react-icons/md'
import { useUserStore } from '../../zustand/userStore'

function PaymentSuccess() {
  const { getQueryField } = useUrl()
  const setCart = useUserStore((state) => state.setCart)
  const handler = async () => {
    await putOrderStatus(
      getQueryField('vnp_TxnRef'),
      getQueryField('vnp_ResponseCode'),
    )
    setCart({
      totalPrice: '',
      cartDetails: [],
      totalItems: 0,
    })
  }
  useEffect(() => {
    handler()
  }, [])
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-100">
      <div className="w-full rounded-lg bg-white p-8 shadow-lg sm:w-96">
        <div className="text-center">
          {/* Biểu tượng thành công */}

          {getQueryField('vnp_ResponseCode') == '00' ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-20 w-20 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h2 className="mt-4 text-3xl font-semibold text-red-500">
                Thanh toán thành công
              </h2>

              <p className="mx-2 mt-2 text-sm text-gray-600">
                Chúc mừng bạn. Đơn hàng của bạn đã được thanh toán thành công.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Mã giao dịch: <strong>{getQueryField('vnp_TxnRef')}</strong>
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Số tiền giao dịch:{' '}
                <strong>{formatVND(getQueryField('vnp_Amount') + 0)}đ</strong>
              </p>
            </>
          ) : (
            <>
              <MdError className="mx-auto h-20 w-20 text-red-500" />

              <h2 className="text-1xl mt-4 text-red-500">
                Thanh toán không thành công, vui lòng thử lại
              </h2>
            </>
          )}

          <div className="mt-6">
            <a
              href="/"
              className="inline-block rounded-md bg-red-500 px-6 py-2 text-white transition duration-200 hover:bg-red-700"
            >
              Quay lại trang chủ
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
