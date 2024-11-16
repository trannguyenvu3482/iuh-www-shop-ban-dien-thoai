import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { HOME_SIDEBAR } from '../../../constants'

const ItemBar = (props) => {
  const { title, icon } = props
  return (
    <div className="group mx-2 cursor-pointer rounded-md text-gray-700 transition-all duration-300 hover:bg-primary-red hover:text-gray-100">
      <div className="flex items-center space-x-2 p-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full">
          <img src={icon} alt={title} className="h-auto w-4" />
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="absolute left-[200px] top-0 z-10 hidden min-h-[400px] w-56 flex-col gap-1 rounded bg-white px-4 py-3 text-sm text-gray-600 shadow-lg group-hover:flex">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <Link
            className="rounded-lg p-2 transition-all hover:bg-primary-red hover:text-white"
            to="#"
            key={index}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  )
}
function Sidebar() {
  return (
    <div>
      <div className="relative w-52 rounded-lg bg-white pb-4 pt-2">
        {HOME_SIDEBAR.map((item, index) => (
          <ItemBar key={index} title={item.title} icon={item.icon} />
        ))}
      </div>
    </div>
  )
}

ItemBar.prototype = {
  title: PropTypes.string,
  icon: PropTypes.string,
}
export default Sidebar
