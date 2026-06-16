import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/Api";

const isUpcoming = (date) =>
  new Date(date) >= new Date(new Date().toDateString());
const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <main className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>My Bookings</h1>
            <p>All your turf reservations, past and upcoming.</p>
          </div>
          <Link to="/turfs" className="btn btn-primary">
            <i className="fa fa-plus me-2"></i>Book another turf
          </Link>
        </div>

        <div className="dashboard-panel">
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
              <h3>Couldn't load bookings</h3>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Try again
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fa fa-futbol"></i>
              </div>
              <h3>No bookings yet</h3>
              <p>
                You haven't booked any turfs. When you do, your reservations
                will show up here.
              </p>
              <Link to="/turfs" className="btn btn-primary">
                Browse turfs
              </Link>
            </div>
          ) : (
            <div className="booking-list">
              {bookings.map((booking, index) => {
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
                        {booking?.turf_id?.address && (
                          <span>
                            <i className="fa fa-location-dot"></i>
                            {booking.turf_id.address}
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

export default MyBooking;
