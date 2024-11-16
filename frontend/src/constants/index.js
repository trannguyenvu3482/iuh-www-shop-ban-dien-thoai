const storesAddress = [
  '291 Đường 3 Tháng 2, P 10, Q 10, HCM',
  '396 Nguyễn Thị Thập, P Tân Quy, Q 7, HCM',
  '50 Trần Quang Khải, P Tân Định, Q 1, HCM',
  '43 Lê Văn Việt, P Hiệp Phú, Q 9, HCM',
  '437 Quang Trung, P 10, Q Gò Vấp, HCM',
  '421 Hoàng Văn Thụ, P 2, Q Tân Bình, HCM',
  '666-668 Lê Hồng Phong, P 10, Q 10, HCM',
  '488 Phạm Văn Thuận, P Tam Hiệp, Biên Hòa, ĐN',
  'TTBH: 668 Lê Hồng Phong, P 10, Quận 10, HCM',
  'Online Shop: Giào hàng tận nơi (Nội thành 2 tiếng)',
]

const hotProducts = [
  {
    name: 'iPhone 16',
    route: '/iphone-16',
  },
  {
    name: 'Galaxy S24 Ultra',
    route: '/samsung-galaxy-s24-s24-ultra',
  },
  {
    name: 'iPhone 15',
    route: '/iphone-15',
  },
  {
    name: 'iPhone 15 Pro Max',
    route: '/iphone-15-pro-max',
  },
  {
    name: 'Galaxy S23 Ultra',
    route: '/samsung-galaxy-s23-s23-ultra',
  },
  {
    name: 'iPhone 14',
    route: '/iphone-14',
  },
  {
    name: 'iPhone 13',
    route: '/iphone-13',
  },
  {
    name: 'iPhone 12',
    route: '/iphone-12',
  },
  {
    name: 'iPhone 11',
    route: '/iphone-11',
  },
]
const HOME_SIDEBAR = [
  {
    title: 'Apple chính hãng',
    icon: 'apple',
    link: '/apple-chinh-hang',
  },
  {
    title: 'iPhone',
    icon: 'iphone',
    link: '/iphone',
  },
  {
    title: 'Samsung',
    icon: 'samsung',
    link: '/samsung',
  },
  {
    title: 'Điện thoại khác',
    icon: 'other_phone',
    link: '/dien-thoai-khac',
  },
  {
    title: 'MacBook - iMac',
    icon: 'macbook_imac',
    link: '/macbook-imac',
  },
  {
    title: 'Máy tính bảng',
    icon: 'tablet',
    link: '/may-tinh-bang',
  },
  {
    title: 'Smartwatch',
    icon: 'smartwatch',
    link: '/smartwatch',
  },
  {
    title: 'Phụ kiện',
    icon: 'accessories',
    link: '/phu-kien',
  },
  {
    title: 'Khuyến mãi',
    icon: 'promotion',
    link: '/khuyen-mai',
  },
  {
    title: 'Tin công nghệ',
    icon: 'tech_news',
    link: '/tin-cong-nghe',
  },
  {
    title: 'Thu cũ đổi mới',
    icon: 'trade_in',
    link: '/thu-cu-doi-moi',
  },
]

const PRODUCT_DUMMY_DATA = [
  {
    imgURL:
      'https://cdn.xtmobile.vn/vnt_upload/product/09_2021/thumbs/(600x600)_crop_ipad-gen-9-wifi-xtmobile.jpg', // Thay đường dẫn đúng
    name: 'iPad Gen 9 64GB Wifi Chính hãng',
    price: '5.799.000',
    oldPrice: '10.990.000',
    initPayment: '1.739.700',
    rating: 5,
    productId: 1,
  },
  {
    imgURL:
      'https://cdn.xtmobile.vn/vnt_upload/product/10_2022/thumbs/(600x600)_crop_ipad-gen-10-64gb-wifi-xtmobile.jpg',
    name: 'iPad Gen 9 10.2 inch 64GB Wifi chưa active',
    price: '6.299.000',
    oldPrice: '9.990.000',
    initPayment: '1.889.700',
    rating: 5,
    productId: 2,
    chips: [
      {
        label: 'Trả góp 0%',
        color: 'basic',
      },
      {
        label: 'Giam 5.000.000',
        color: 'primary',
      },
    ],
  },
  {
    imgURL:
      'https://cdn.xtmobile.vn/vnt_upload/product/09_2021/thumbs/(600x600)_crop_ipad-gen-9-wifi-xtmobile.jpg', // Thay đường dẫn đúng
    name: 'iPad Gen 9 64GB Wifi Chính hãng',
    price: '5.799.000',
    oldPrice: '10.990.000',
    initPayment: '1.739.700',
    rating: 5,
    productId: 4,
  },
  {
    imgURL:
      'https://cdn.xtmobile.vn/vnt_upload/product/10_2022/thumbs/(600x600)_crop_ipad-gen-10-64gb-wifi-xtmobile.jpg',
    name: 'iPad Gen 9 10.2 inch 64GB Wifi chưa active',
    price: '6.299.000',
    oldPrice: '9.990.000',
    initPayment: '1.889.700',
    rating: 5,
    productId: 3,
    chips: [
      {
        label: 'Trả góp 0%',
        color: 'basic',
      },
      {
        label: 'Giam 5.000.000',
        color: 'primary',
      },
    ],
  },
  {
    imgURL:
      'https://cdn.xtmobile.vn/vnt_upload/product/10_2022/thumbs/(600x600)_crop_ipad-gen-10-64gb-wifi-xtmobile.jpg',
    name: 'iPad Gen 9 10.2 inch 64GB Wifi chưa active',
    price: '6.299.000',
    oldPrice: '9.990.000',
    initPayment: '1.889.700',
    rating: 5,
    productId: 3,
    chips: [
      {
        label: 'Trả góp 0%',
        color: 'basic',
      },
      {
        label: 'Giam 5.000.000',
        color: 'primary',
      },
    ],
  },
  {
    imgURL:
      'https://cdn.xtmobile.vn/vnt_upload/product/10_2022/thumbs/(600x600)_crop_ipad-gen-10-64gb-wifi-xtmobile.jpg',
    name: 'iPad Gen 9 10.2 inch 64GB Wifi chưa active',
    price: '6.299.000',
    oldPrice: '9.990.000',
    initPayment: '1.889.700',
    rating: 5,
    productId: 3,
    chips: [
      {
        label: 'Trả góp 0%',
        color: 'basic',
      },
      {
        label: 'Giam 5.000.000',
        color: 'primary',
      },
    ],
  },
  {
    imgURL:
      'https://cdn.xtmobile.vn/vnt_upload/product/10_2022/thumbs/(600x600)_crop_ipad-gen-10-64gb-wifi-xtmobile.jpg',
    name: 'iPad Gen 9 10.2 inch 64GB Wifi chưa active',
    price: '6.299.000',
    oldPrice: '9.990.000',
    initPayment: '1.889.700',
    rating: 5,
    productId: 3,
    chips: [
      {
        label: 'Trả góp 0%',
        color: 'basic',
      },
      {
        label: 'Giam 5.000.000',
        color: 'primary',
      },
    ],
  },
  {
    imgURL:
      'https://cdn.xtmobile.vn/vnt_upload/product/10_2022/thumbs/(600x600)_crop_ipad-gen-10-64gb-wifi-xtmobile.jpg',
    name: 'iPad Gen 9 10.2 inch 64GB Wifi chưa active',
    price: '6.299.000',
    oldPrice: '9.990.000',
    initPayment: '1.889.700',
    rating: 5,
    productId: 3,
    chips: [
      {
        label: 'Trả góp 0%',
        color: 'basic',
      },
      {
        label: 'Giam 5.000.000',
        color: 'primary',
      },
    ],
  },
  {
    imgURL:
      'https://cdn.xtmobile.vn/vnt_upload/product/10_2022/thumbs/(600x600)_crop_ipad-gen-10-64gb-wifi-xtmobile.jpg',
    name: 'iPad Gen 9 10.2 inch 64GB Wifi chưa active',
    price: '6.299.000',
    oldPrice: '9.990.000',
    initPayment: '1.889.700',
    rating: 5,
    productId: 3,
    chips: [
      {
        label: 'Trả góp 0%',
        color: 'basic',
      },
      {
        label: 'Giam 5.000.000',
        color: 'primary',
      },
    ],
  },
  {
    imgURL:
      'https://cdn.xtmobile.vn/vnt_upload/product/10_2022/thumbs/(600x600)_crop_ipad-gen-10-64gb-wifi-xtmobile.jpg',
    name: 'iPad Gen 9 10.2 inch 64GB Wifi chưa active',
    price: '6.299.000',
    oldPrice: '9.990.000',
    initPayment: '1.889.700',
    rating: 5,
    productId: 3,
    chips: [
      {
        label: 'Trả góp 0%',
        color: 'basic',
      },
      {
        label: 'Giam 5.000.000',
        color: 'primary',
      },
    ],
  },
]

const CATEGORY_DUMMY_DATA = [
  { name: 'iPad Gen 10', path: '/ipad-gen-10' },
  { name: 'iPad Air 5', path: '/ipad-air-5' },
  { name: 'iPad Gen 9', path: '/ipad-gen-9' },
  { name: 'iPad mini 6', path: '/ipad-mini-6' },
  { name: 'iPad Pro 2021', path: '/ipad-pro-2021' },
  { name: 'iPad Pro M2 2022', path: '/ipad-pro-m2-2022' },
]

const SECTIONS_OF_HOME = [
  {
    title: 'điện thoại nổi bật',
    categories: CATEGORY_DUMMY_DATA,
    dataList: PRODUCT_DUMMY_DATA,
  },
  {
    title: 'Macbook - imac',
    categories: CATEGORY_DUMMY_DATA,
    dataList: PRODUCT_DUMMY_DATA,
  },
  {
    title: 'máy tính bảng',
    categories: CATEGORY_DUMMY_DATA,
    dataList: PRODUCT_DUMMY_DATA,
  },
  {
    title: 'đồng hồ thông minh',
    categories: CATEGORY_DUMMY_DATA,
    dataList: PRODUCT_DUMMY_DATA,
  },
  {
    title: 'Phụ kiện nổi bật',
    categories: CATEGORY_DUMMY_DATA,
    dataList: PRODUCT_DUMMY_DATA,
  },
]
export {
  hotProducts,
  storesAddress,
  HOME_SIDEBAR,
  PRODUCT_DUMMY_DATA,
  CATEGORY_DUMMY_DATA,
  SECTIONS_OF_HOME,
}
