import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white text-sm text-gray-800">
      {/* Hàng trên cùng */}
      <div className="mx-auto grid max-w-[1220px] grid-cols-5 gap-4 py-8">
        {/* Cột 1: Tổng đài hỗ trợ */}
        <div>
          <h3 className="mb-4 font-bold">TỔNG ĐÀI HỖ TRỢ</h3>
          <p className="mb-2">
            <span className="font-semibold text-primary-red">1800.6229</span>{' '}
            (08h30 - 21h30)
            <br />
            Tư vấn mua hàng (miễn phí)
          </p>
          <p className="mb-2">
            <span className="font-semibold text-primary-red">088.99999.33</span>{' '}
            (08h30 - 21h00)
            <br />
            Khiếu nại - Góp ý
          </p>
          <p>
            <span className="font-semibold text-primary-red">088.99999.22</span>{' '}
            (08h30 - 21h00)
            <br />
            Bán hàng doanh nghiệp B2B
          </p>
        </div>

        {/* Cột 2: Hỗ trợ khách hàng */}
        <div>
          <h3 className="mb-4 font-bold">HỖ TRỢ KHÁCH HÀNG</h3>
          <ul>
            <li className="mb-2">Mua hàng trả góp</li>
            <li className="mb-2">Chính sách kiểm hàng</li>
            <li className="mb-2">Mua hàng online</li>
            <li className="mb-2">Chính sách bảo hành</li>
            <li className="mb-2">Chính sách đổi trả</li>
            <li className="cursor-pointer text-blue-500">Xem thêm</li>
          </ul>
        </div>

        {/* Cột 3: XTMOBILE */}
        <div>
          <h3 className="mb-4 font-bold">XTMOBILE</h3>
          <ul>
            <li className="mb-2">Giới thiệu về XTMobile</li>
            <li className="mb-2">Tuyển dụng</li>
            <li className="mb-2">Liên hệ hợp tác</li>
            <li className="mb-2">Bán hàng doanh nghiệp</li>
            <li className="mb-2">Về trang chủ</li>
          </ul>
        </div>

        {/* Cột 4: Hệ thống cửa hàng */}
        <div>
          <h3 className="mb-4 font-bold">HỆ THỐNG CỬA HÀNG XTMOBILE</h3>
          <p className="mb-4">
            Thời gian làm việc:
            <br />
            <span className="font-bold text-primary-red">
              08h30 - 21h30
            </span>{' '}
            (kể cả T7, CN)
          </p>
          <p className="mb-4">Hệ thống cửa hàng bán lẻ</p>
          <div className="flex gap-2">
            <img
              src="/thanhtoan.jpg"
              alt="Visa"
              className="h-26 w-52 bg-white"
            />
          </div>
        </div>

        {/* Cột 5: Kết nối */}
        <div>
          <h3 className="mb-4 font-bold">KẾT NỐI VỚI CHÚNG TÔI</h3>
          <div className="mb-4 flex gap-2">
            <FaFacebook className="h-6 w-6 text-blue-500" />
            <FaYoutube className="h-6 w-6 text-red-600" />
            <FaInstagram className="h-6 w-6 text-pink-600" />
            <FaTiktok className="h-6 w-6" />
          </div>
          <div>
            <img
              src="https://www.xtmobile.vn/skins/default/images/dathongbao.jpg"
              alt="DMCA Protected"
              className="inline-block w-20"
            />
            <img
              src="https://images.dmca.com/Badges/_dmca_premi_badge_2.png?ID=25214b63-d135-4dab-8c7b-c5dfbd1d8dee"
              alt="DMCA Protected"
              className="inline-block w-20"
            />
          </div>
        </div>
      </div>

      {/* Hàng dưới */}
      <div className="border-t-2 border-gray-300 bg-[#f8f8f8] py-4">
        <div className="mx-auto max-w-[1220px] text-center">
          <p className="mb-1 text-xs text-gray-600">
            Điện thoại iPhone - iPhone 16 - iPhone 15 - iPhone 15 Pro - iPhone
            15 Pro Max - iPhone 14 - iPhone 13 - iPhone 13 Pro Max - iPhone 12
            Pro Max - iPhone 11
          </p>
          <p className="mb-1 text-xs text-gray-600">
            Điện thoại Samsung - Samsung S25 - Samsung S24 - Z Fold 5
          </p>
          <p className="mb-1 mt-6 text-xs text-gray-600">
            Copyright © 2014 XTmobile. Giấy chứng nhận ĐKKD số 41J8021261 do
            UBND Quận 10 cấp ngày 08/07/2014. Bản quyền xtmobile.vn
          </p>
          <p className="text-xs text-gray-600">
            Địa chỉ: 666 Lê Hồng Phong, P. 10, Q.10, TP.Hồ Chí Minh. Điện thoại:
            1800.6229 (Miễn Phí) Email: xtmobile.sg@gmail.com. Chịu trách nhiệm
            nội dung: Lê Xuân Hoà
          </p>
        </div>
      </div>
    </footer>
  )
}
