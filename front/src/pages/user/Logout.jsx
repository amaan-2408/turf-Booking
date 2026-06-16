import React from 'react'
import { useNavigate,Navigate} from 'react-router-dom'

const Logout = () => {
  // let navigate=useNavigate();
  localStorage.removeItem("user_access")
  // navigate("/user/login")
  return (
    <Navigate to={"/user/login"} />
  )
}

export default Logout