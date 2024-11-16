/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import { HOME_SIDEBAR } from '../../../constants'

const ItemBar = (props) => {
  const { title, icon } = props
  return (
    <div className="group relative mx-2 cursor-pointer rounded-md text-gray-700 transition-all duration-300 hover:bg-primary-red hover:text-gray-100">
      <div className="flex items-center space-x-2 p-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300">
          <img src={icon} alt={title} className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="absolute left-52 top-0 z-10 hidden w-44 rounded bg-white p-2 text-sm text-gray-600 shadow-lg group-hover:block">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <h2 key={index}>{title}</h2>
        ))}
      </div>
    </div>
  )
}
function Sidebar() {
  return (
    <div>
      <div className="w-52 rounded-lg bg-white">
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
