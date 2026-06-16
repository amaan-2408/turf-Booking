import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/Api";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const BusinessMyAccount = () => {
  const [turfs, setTurfs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const businessName = localStorage.getItem("business_name") || "Partner";

  useEffect(() => {
    const headers = { Authorization: localStorage.getItem("business_access") };

    Promise.all([
      axios
        .get(`${API_URL}/turfs/allturf`, { headers })
        .catch(() => ({ data: [] })),
      axios
        .get(`${API_URL}/business/allbooking`, { headers })
        .catch(() => ({ data: [] })),
    ])
      .then(([turfsRes, bookingsRes]) => {
        setTurfs(turfsRes.data || []);
        setBookings(bookingsRes.data || []);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Could not load your dashboard.");
        setIsLoading(false);
      });
  }, []);

  // Stats
  const today = new Date().toDateString();
  const todaysBookings = bookings.filter(
    (b) => new Date(b.date).toDateString() === today,
  );
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const recentBookings = bookings.slice(0, 3);

  return (
    <main className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome, {businessName} 🏟️</h1>
            <p>Here's how your turfs are performing today.</p>
          </div>
          <Link to="/business/addturf" className="btn btn-primary btn-lg">
            <i className="fa fa-plus me-2"></i>Add a Turf
          </Link>
        </div>

        {/* Stat tiles */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-futbol"></i>
            </div>
            <div className="stat-value">{turfs.length}</div>
            <p className="stat-label">Total turfs</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-calendar-day"></i>
            </div>
            <div className="stat-value">{todaysBookings.length}</div>
            <p className="stat-label">Bookings today</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-indian-rupee-sign"></i>
            </div>
            <div className="stat-value">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
            <p className="stat-label">Total revenue</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-receipt"></i>
            </div>
            <div className="stat-value">{bookings.length}</div>
            <p className="stat-label">All-time bookings</p>
          </div>
        </div>

        {/* Quick action if no turfs */}
        {turfs.length === 0 && !isLoading && !error && (
          <div className="quick-action">
            <h3>Add your first turf</h3>
            <p>
              List your facility in minutes. Start receiving online bookings
              today.
            </p>
            <Link to="/business/addturf" className="btn btn-light btn-lg">
              Add a turf
            </Link>
          </div>
        )}

        {/* Recent bookings */}
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <h2>Recent bookings</h2>
            <NavLink to="/business/allbooking">View all →</NavLink>
          </div>

          {isLoading ? (
            <div className="skeleton-list">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-item">
                  <div className="skeleton skeleton-box w-80"></div>
                  <div>
                    <div className="skeleton skeleton-box w-60 mb-2"></div>
                    <div className="skeleton skeleton-box w-40"></div>
                  </div>
                  <div
                    className="skeleton skeleton-box"
                    style={{ width: 60, height: 24 }}
                  ></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fa fa-exclamation-triangle"></i>
              </div>
              <h3>Couldn't load your dashboard</h3>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Try again
              </button>
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fa fa-calendar-xmark"></i>
              </div>
              <h3>No bookings yet</h3>
              <p>
                Once customers start booking your turfs, their reservations will
                appear here.
              </p>
              <NavLink to="/business/myturf" className="btn btn-primary">
                View your turfs
              </NavLink>
            </div>
          ) : (
            <div className="booking-list">
              {recentBookings.map((booking, index) => (
                <div key={index} className="booking-item">
                  {booking?.turf_id?.image ? (
                    <div
                      className="booking-item-thumb"
                      style={{
                        backgroundImage: `url(http://localhost:3000/turf_images/${booking.turf_id.image})`,
                      }}
                      role="img"
                      aria-label={booking.turf_id.name}
                    />
                  ) : (
                    <div className="booking-item-thumb-fallback">
                      <i className="fa fa-futbol"></i>
                    </div>
                  )}

                  <div className="booking-item-body">
                    <h3>{booking?.turf_id?.name || "Booking"}</h3>
                    <div className="booking-item-meta">
                      <span>
                        <i className="fa fa-calendar"></i>
                        {formatDate(booking.date)}
                      </span>
                      {booking?.user_id?.name && (
                        <span>
                          <i className="fa fa-user"></i>
                          {booking.user_id.name}
                        </span>
                      )}
                      {booking.slot && (
                        <span>
                          <i className="fa fa-clock"></i>
                          {Array.isArray(booking.slot)
                            ? booking.slot.join(", ")
                            : booking.slot}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="booking-item-amount">
                    <small>Booking</small>₹
                    {(booking.amount || 0).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BusinessMyAccount;
