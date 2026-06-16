import { NavLink } from "react-router-dom";

const BusinessNavbar = () => {
  return (
    <div className="col-md-3 col-lg-2">
      <nav className="dash-sidebar">
        <h4>Business Account</h4>
        <ul>
          <li>
            <NavLink to="/business/myaccount" end>
              <i className="fa fa-gauge-high"></i>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/business/myturf">
              <i className="fa fa-futbol"></i>
              My Turfs
            </NavLink>
          </li>
          <li>
            <NavLink to="/business/addturf">
              <i className="fa fa-circle-plus"></i>
              Add Turf
            </NavLink>
          </li>
          <li>
            <NavLink to="/business/allbooking">
              <i className="fa fa-receipt"></i>
              All Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="/business/myprofile">
              <i className="fa fa-user"></i>
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/business/updateprofile">
              <i className="fa fa-pen-to-square"></i>
              Edit Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/business/logout">
              <i className="fa fa-right-from-bracket"></i>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BusinessNavbar;
