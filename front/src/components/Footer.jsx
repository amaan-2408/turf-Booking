import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-5 mb-5 align-items-center">
          <div className="col-lg-7">
            <h3
              className="text-white mb-3 d-flex align-items-center gap-2"
              style={{ fontWeight: 800 }}
            >
              <i className="fa fa-futbol brand-icon"></i>
              Game On Turf
            </h3>
            <p
              className="mb-0"
              style={{ color: "rgba(255,255,255,0.7)", maxWidth: "480px" }}
            >
              Easily book your favorite turf online. Secure your slot for any
              sport and enjoy the game — no phone calls, no waiting.
            </p>
          </div>

          <div className="col-lg-5">
            <div className="d-flex align-items-center justify-content-lg-end gap-2">
              <a
                href="#"
                className="btn btn-secondary btn-md-square rounded-circle"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="btn btn-secondary btn-md-square rounded-circle"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="btn btn-secondary btn-md-square rounded-circle"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="btn btn-secondary btn-md-square rounded-circle"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="row g-5">
          <div className="col-md-6 col-lg-4">
            <h4 className="text-white mb-3">Sports</h4>
            <div className="d-flex flex-column gap-2">
              <NavLink to="/turfs">
                <i className="fas fa-angle-right"></i>Cricket
              </NavLink>
              <NavLink to="/turfs">
                <i className="fas fa-angle-right"></i>Football
              </NavLink>
              <NavLink to="/turfs">
                <i className="fas fa-angle-right"></i>Pickleball
              </NavLink>
              <NavLink to="/turfs">
                <i className="fas fa-angle-right"></i>Badminton
              </NavLink>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <h4 className="text-white mb-3">Quick Links</h4>
            <div className="d-flex flex-column gap-2">
              <NavLink to="/">
                <i className="fas fa-angle-right"></i>Home
              </NavLink>
              <NavLink to="/about">
                <i className="fas fa-angle-right"></i>About Us
              </NavLink>
              <NavLink to="/turfs">
                <i className="fas fa-angle-right"></i>Book Turf
              </NavLink>
              <NavLink to="/user/signup">
                <i className="fas fa-angle-right"></i>Sign Up
              </NavLink>
              <NavLink to="/business/register">
                <i className="fas fa-angle-right"></i>List Your Turf
              </NavLink>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <h4 className="text-white mb-3">Contact</h4>
            <div className="d-flex flex-column gap-2">
              <a href="#">
                <i className="fa fa-map-marker-alt"></i>94 ED Robot Square,
                Indore
              </a>
              <a href="mailto:turf@gmail.com">
                <i className="fas fa-envelope"></i>turf@gmail.com
              </a>
              <a href="tel:+55585382241">
                <i className="fas fa-phone"></i>+555 8538 2241
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
