import React from 'react'
import { useNavigate,Navigate} from 'react-router-dom'

const BusinessLogout = () => {
  // let navigate=useNavigate();
  localStorage.removeItem("business_access")
  localStorage.removeItem("business_name")
  // navigate("/user/login")
  return (
    <Navigate to={"/business/login"} />
  )
}

export default BusinessLogout