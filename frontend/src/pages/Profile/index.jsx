import { Avatar } from '@mui/material'
import useMe from '../../hooks/useMe'
import OrderHistory from '../Order'
import { MdManageAccounts } from 'react-icons/md'
import { TbInvoice } from 'react-icons/tb'
import { IoIosNotifications } from 'react-icons/io'
import { FaWarehouse } from 'react-icons/fa'

const ROUTER_USER = [
  {
    name: 'Tài khoản của tôi',
    icon: <MdManageAccounts />,
    select: false,
  },
  {
    name: 'Đơn hàng của tôi',
    icon: <TbInvoice />,
    select: true,
  },
  {
    name: 'Thông báo',
    icon: <IoIosNotifications />,
    select: false,
  },
  {
    name: 'Kho voucher',
    icon: <FaWarehouse />,
    select: false,
  },
]
function Profile() {
  const { me } = useMe()
  return (
    <div className="my-10">
      <div className="mx-auto flex max-w-[1160px] gap-10 rounded-md !bg-white px-10 py-20 shadow-md">
        <div className="flex flex-col">
          <div className="flex w-40 gap-2">
            <div>
              <Avatar src={`${me.avatar}`} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-600">{me.name}</h2>
              <a href="" className="text-sm text-slate-500">
                Sửa hồ sơ
              </a>
            </div>
          </div>
          <div className="mt-4 w-40">
            {ROUTER_USER.map((item, index) => (
              <div key={index} className="mt-4 flex items-center gap-2">
                <div
                  className={` ${item.select ? 'text-primary-red' : 'text-slate-500'}`}
                >
                  {item.icon}
                </div>
                <div
                  className={` ${item.select ? 'text-primary-red' : 'text-slate-500'}`}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <OrderHistory />
        </div>
      </div>
    </div>
  )
}

export default Profile
