import React from 'react'
import { NavLink } from 'react-router-dom'

const BusinessNavbar = () => {
  return (
    <div className='col-md-2 sol-sm-2'>
              <div className='alert alert-info'>
                <h4>Business Account</h4>
              <ul className='nav'>
                <li className='nav-item'>
                  <NavLink to="/business/myaccount" className='nav-link'>My Account</NavLink>
                </li>
                 <li className='nav-item'>
                  <NavLink to="/business/myturf" className='nav-link'>My Turf</NavLink>
                </li>
                 <li className='nav-item'>
                  <NavLink to="/business/addturf" className='nav-link'>Add Turfs</NavLink>
                </li>
                 <li className='nav-item'>
                  <NavLink to="/business/allbooking" className='nav-link'>All Turf Booking</NavLink>
                </li>
                 <li className='nav-item'>
                  <NavLink to="/business/myprofile" className='nav-link'>My Profile</NavLink>
                </li>
                 <li className='nav-item'>
                  <NavLink to="/business/logout" className='nav-link'>Logout</NavLink>
                </li>
              </ul>
              </div>
            </div>
  )
}

export default BusinessNavbar