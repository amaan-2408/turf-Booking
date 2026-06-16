import React from 'react'
import { Outlet, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import BusinessNavbar from '../components/BusinessNavbar';


const BusinessProtectedRoute = () => {
     let navigate=useNavigate();
        useEffect(()=>{
            if(! localStorage.getItem("business_access"))
            {
                navigate("/business/login")
            }
        })
  return (

    <div className='container my-5'>
          <div className='row'>
           <BusinessNavbar/>
            <div className='col-md-10'>
                <Outlet/>
            </div>
          </div>
         
        </div>
  )
}

export default BusinessProtectedRoute