import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/Api";

// Helpers
const isUpcoming = (date) =>
  new Date(date) >= new Date(new Date().toDateString());
const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const MyAccount = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userName = localStorage.getItem("name") || "there";

  useEffect(() => {
    axios
      .get(`${API_URL}/user/mybooking`, {
        headers: { Authorization: localStorage.getItem("user_access") },
      })
      .then((response) => {
        setBookings(response.data || []);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Could not load your bookings.");
        setIsLoading(false);
      });
  }, []);

  // Derived stats
  const upcoming = bookings.filter((b) => isUpcoming(b.date));
  const past = bookings.filter((b) => !isUpcoming(b.date));
  const totalSpent = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const recentBookings = bookings.slice(0, 3);

  return (
    <main className="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {userName} 👋</h1>
            <p>Here's a quick look at your bookings and recent activity.</p>
          </div>
          <Link to="/turfs" className="btn btn-primary btn-lg">
            <i className="fa fa-calendar-plus me-2"></i>Book a Turf
          </Link>
        </div>

        {/* Stat tiles */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-calendar-check"></i>
            </div>
            <div className="stat-value">{upcoming.length}</div>
            <p className="stat-label">Upcoming bookings</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-clock-rotate-left"></i>
            </div>
            <div className="stat-value">{bookings.length}</div>
            <p className="stat-label">Total bookings</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-indian-rupee-sign"></i>
            </div>
            <div className="stat-value">
              ₹{totalSpent.toLocaleString("en-IN")}
            </div>
            <p className="stat-label">Total spent</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-trophy"></i>
            </div>
            <div className="stat-value">{past.length}</div>
            <p className="stat-label">Past games</p>
          </div>
        </div>

        {/* Quick action banner (only if no upcoming bookings) */}
        {upcoming.length === 0 && !isLoading && !error && (
          <div className="quick-action">
            <h3>Ready to play?</h3>
            <p>
              Book your next turf session in seconds. Premium turfs, instant
              confirmation.
            </p>
            <Link to="/turfs" className="btn btn-light btn-lg">
              Browse turfs
            </Link>
          </div>
        )}

        {/* Recent bookings */}
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <h2>Recent bookings</h2>
            <NavLink to="/user/mybooking">View all →</NavLink>
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
              <h3>Couldn't load your bookings</h3>
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
                <i className="fa fa-futbol"></i>
              </div>
              <h3>No bookings yet</h3>
              <p>
                When you book a turf, it will show up here. Start by browsing
                available turfs.
              </p>
              <Link to="/turfs" className="btn btn-primary">
                Browse turfs
              </Link>
            </div>
          ) : (
            <div className="booking-list">
              {recentBookings.map((booking, index) => {
                const status = isUpcoming(booking.date) ? "upcoming" : "past";
                return (
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
                      <h3>{booking?.turf_id?.name || "Turf booking"}</h3>
                      <div className="booking-item-meta">
                        <span>
                          <i className="fa fa-calendar"></i>
                          {formatDate(booking.date)}
                        </span>
                        {booking.slot && (
                          <span>
                            <i className="fa fa-clock"></i>
                            {Array.isArray(booking.slot)
                              ? booking.slot.join(", ")
                              : booking.slot}
                          </span>
                        )}
                        <span className={`badge-status ${status}`}>
                          {status === "upcoming" ? "Upcoming" : "Completed"}
                        </span>
                      </div>
                    </div>

                    <div className="booking-item-amount">
                      <small>Paid</small>₹
                      {(booking.amount || 0).toLocaleString("en-IN")}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyAccount;
