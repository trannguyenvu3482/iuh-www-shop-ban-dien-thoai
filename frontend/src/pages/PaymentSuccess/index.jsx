import React from 'react'

function PaymentSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-100">
      <div className="w-full rounded-lg bg-white p-8 shadow-lg sm:w-96">
        <div className="text-center">
          {/* Biểu tượng thành công */}
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
            Mã giao dịch: <strong>#123456789</strong>
          </p>

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
