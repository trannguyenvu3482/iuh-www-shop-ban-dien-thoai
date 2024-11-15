/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import { HOME_SIDEBAR } from '../../../constants'

const ItemBar = (props)=> {
    const {title ,icon} = props
    return <div className="relative rounded-md mx-2 group text-gray-700 cursor-pointer hover:text-gray-100 hover:bg-primary-red transition-all duration-300">
    <div className="flex items-center space-x-2 p-2">
      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
        <img src={icon} alt={title} className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium">{title}</span>
    </div>
    <div className="hidden text-sm  w-44 group-hover:block absolute z-10 top-0 left-52 text-gray-600 bg-white p-2 rounded shadow-lg">
       { [1,2,3,4,5].map((item,index)=>(<h2 key={index}>{title}</h2>))}
    </div>
  </div>
}
function Sidebar() {
  return (
    <div>
        <div className='bg-white rounded-lg w-52'>
            {
                HOME_SIDEBAR.map((item,index)=>(
                    <ItemBar key={index} title={item.title} icon={item.icon}/>
                ))
            }
        </div>
    </div>
  )
}

ItemBar.prototype={
    title:PropTypes.string,
    icon:PropTypes.string
}
export default Sidebar