import { FaExchangeAlt, FaTruck, FaBoxOpen, FaWallet } from 'react-icons/fa'

const Description = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h3 className="text-md mb-4 font-bold text-gray-600">
        Thông tin sản phẩm
      </h3>
      <ul className="space-y-4 px-4">
        <li className="flex items-start space-x-3">
          <FaExchangeAlt className="text-grey-500 text-2xl" />
          <p>
            1 đổi 1 trong <span className="font-bold">30 ngày</span>, bảo hành{' '}
            <span className="font-bold">12 tháng</span>{' '}
            <a href="#" className="text-primary-red hover:underline">
              (Xem chi tiết)
            </a>
          </p>
        </li>
        <li className="flex items-start space-x-3">
          <FaTruck className="text-2xl text-gray-500" />
          <p>Giao hàng miễn phí nội thành TP.HCM</p>
        </li>

        <li className="flex items-start space-x-3">
          <FaBoxOpen className="text-2xl text-gray-500" />
          <p>Bộ sản phẩm: Hộp, máy, cáp, cây lấy sim, sách hướng dẫn</p>
        </li>
        <li className="flex items-start space-x-3">
          <FaWallet className="text-2xl text-gray-500" />
          <p>
            Trả trước <span className="font-bold">30%</span> qua HD Saison. Thủ
            tục chỉ cần CMND hoặc CCCD; Hoặc trả góp{' '}
            <span className="font-bold">lãi suất 0%</span> qua thẻ tín dụng
            Visa, Master, JCB.
          </p>
        </li>
      </ul>
    </div>
  )
}

export default Description
