import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ scrolled = false }) => {
  const navigate = useNavigate();
  const userLoggedIn = !!localStorage.getItem("user_access");
  const businessLoggedIn = !!localStorage.getItem("business_access");
  const userName = localStorage.getItem("name");
  const businessName = localStorage.getItem("business_name");

  const handleLogout = () => {
    localStorage.removeItem("user_access");
    localStorage.removeItem("name");
    navigate("/user/login");
  };

  const handleBusinessLogout = () => {
    localStorage.removeItem("business_access");
    localStorage.removeItem("business_name");
    navigate("/business/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top${scrolled ? " scrolled" : ""}`}
      style={{ zIndex: 1020 }}
    >
      <div className="container">
        {/* Brand */}
        <NavLink to="/" className="navbar-brand">
          <i className="fa fa-futbol"></i>
          <span>Game On Turf</span>
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars"></i>
        </button>

        {/* Nav items */}
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto align-items-lg-center gap-1">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>

            {/* User section */}
            {userLoggedIn ? (
              <>
                <NavLink to="/user/myaccount" className="nav-link">
                  My Account
                </NavLink>
                <NavLink to="/user/mybooking" className="nav-link">
                  My Bookings
                </NavLink>
                <span
                  className="nav-link d-none d-lg-inline-flex align-items-center gap-2"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <i
                    className="fa fa-user-circle"
                    style={{ color: "var(--color-primary)" }}
                  ></i>
                  <span style={{ fontWeight: 600 }}>{userName || "User"}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-secondary ms-lg-2"
                  style={{ borderRadius: "var(--radius)" }}
                >
                  Logout
                </button>
              </>
            ) : businessLoggedIn ? (
              <>
                <NavLink to="/business/myaccount" className="nav-link">
                  Dashboard
                </NavLink>
                <NavLink to="/business/myturf" className="nav-link">
                  My Turfs
                </NavLink>
                <span
                  className="nav-link d-none d-lg-inline-flex align-items-center gap-2"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <i
                    className="fa fa-building"
                    style={{ color: "var(--color-primary)" }}
                  ></i>
                  <span style={{ fontWeight: 600 }}>
                    {businessName || "Business"}
                  </span>
                </span>
                <button
                  onClick={handleBusinessLogout}
                  className="btn btn-sm btn-outline-secondary ms-lg-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* User dropdown */}
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    role="button"
                  >
                    User
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <NavLink to="/user/login" className="dropdown-item">
                      <i className="fa fa-sign-in-alt me-2"></i>Login
                    </NavLink>
                    <NavLink to="/user/signup" className="dropdown-item">
                      <i className="fa fa-user-plus me-2"></i>Sign Up
                    </NavLink>
                  </div>
                </div>

                {/* Business dropdown */}
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    role="button"
                  >
                    Business
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <NavLink to="/business/login" className="dropdown-item">
                      <i className="fa fa-sign-in-alt me-2"></i>Login
                    </NavLink>
                    <NavLink to="/business/register" className="dropdown-item">
                      <i className="fa fa-store me-2"></i>Register
                    </NavLink>
                  </div>
                </div>

                <NavLink to="/turfs" className="btn btn-primary btn-sm ms-lg-2">
                  Book Now
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
