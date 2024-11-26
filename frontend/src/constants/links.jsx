import { BsCurrencyDollar } from 'react-icons/bs'
import { FaHandshake, FaShare } from 'react-icons/fa'
import {
  FiHome,
  FiMessageCircle,
  FiSettings,
  FiShoppingBag,
  FiShoppingCart,
  FiUsers,
} from 'react-icons/fi'

export const links = [
  {
    name: 'Trang chủ',
    icon: <FiHome />,
    url: '/admin',
  },
  {
    name: 'Sản phẩm',
    icon: <FiShoppingBag />,
    subLinks: [
      {
        name: 'Tất cả sản phẩm',
        url: '/admin/products',
      },
      {
        name: 'Thêm sản phẩm mới',
        url: '/admin/products/add',
      },
      {
        name: 'Danh mục sản phẩm',
        url: '/admin/products/categories',
      },
    ],
  },
  {
    name: 'Khách hàng',
    icon: <FiUsers />,
    url: '/admin/customers',
  },
  {
    name: 'Thống kê',
    icon: <BsCurrencyDollar />,
    subLinks: [
      {
        name: 'Thống kê doanh số',
        url: '/admin/sales/analysis',
      },
      {
        name: 'Doanh số công ty',
        url: '/admin/sales',
      },
    ],
  },
  {
    name: 'Hóa đơn',
    icon: <FiShoppingCart />,
    subLinks: [
      {
        name: 'Tất cả hóa đơn',
        url: '/admin/orders',
      },
      {
        name: 'Mẫu hóa đơn',
        url: '/admin/orders/template',
      },
    ],
  },
  {
    name: 'Nhà phân phối',
    icon: <FaShare />,
    url: '/admin/suppliers',
  },
  {
    name: 'Giao dịch',
    icon: <FaHandshake />,
    url: '/admin/transactions',
  },
  {
    name: 'Đánh giá',
    icon: <FiMessageCircle />,
    url: '/admin/reviews',
  },
  {
    name: 'Cài đặt',
    icon: <FiSettings />,
    url: '/admin/settings',
  },
]