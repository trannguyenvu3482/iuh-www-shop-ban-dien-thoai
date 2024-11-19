import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ user, children }) => {
  // TODO: CHANGE THIS LATER
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  console.log(children)

  if (!isLoggedIn) {
    return <Navigate to="/" />
  }
  return children
}

export default PrivateRoute
