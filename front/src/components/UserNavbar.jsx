import { NavLink } from "react-router-dom";

const UserNavbar = () => {
  return (
    <div className="col-md-3 col-lg-2">
      <nav className="dash-sidebar">
        <h4>Your Account</h4>
        <ul>
          <li>
            <NavLink to="/user/myaccount" end>
              <i className="fa fa-gauge-high"></i>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/mybooking">
              <i className="fa fa-calendar-check"></i>
              My Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/myprofile">
              <i className="fa fa-user"></i>
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/updateprofile">
              <i className="fa fa-pen-to-square"></i>
              Edit Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/user/logout">
              <i className="fa fa-right-from-bracket"></i>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserNavbar;
