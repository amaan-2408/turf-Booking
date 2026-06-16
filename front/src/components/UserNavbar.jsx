import React from 'react'
import { NavLink } from 'react-router-dom'

const UserNavbar = () => {
  return (
     <div className='col-md-2'>
              <div className='alert alert-info'>
                <h4>Your Account</h4>
              <ul className='nav'>
                <li className='nav-item'>
                  <NavLink to="/user/myaccount" className='nav-link'>My Account</NavLink>
                </li>
                 <li className='nav-item'>
                  <NavLink to="/user/myprofile" className='nav-link'>My Profile</NavLink>
                </li>
                 <li className='nav-item'>
                  <NavLink to="/user/mybooking" className='nav-link'>My Booking</NavLink>
                </li>
                 <li className='nav-item'>
                  <NavLink to="/user/logout" className='nav-link'>Logout</NavLink>
                </li>
              </ul>
              </div>
            </div>
  )
}

export default UserNavbar