import React from 'react'
import { Outlet, useNavigate,NavLink} from 'react-router-dom'
import { useEffect } from 'react'
import UserNavbar from '../components/UserNavbar';

const UserProtectedRoute = () => {
    let navigate=useNavigate();
    useEffect(()=>{
        if(! localStorage.getItem("user_access"))
        {
            navigate("/user/login")
        }
    })
  return (
    <>
     <div className='container my-5'>
          <div className='row'>
           <UserNavbar/>
            <div className='col-md-10'>
                <Outlet/>
            </div>
          </div>
         
        </div>
    </>
    
  )
}

export default UserProtectedRoute