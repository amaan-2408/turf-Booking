import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config/Api";

const AllBooking = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/business/mybooking`, {
       
      })
      .then((res) => {
        setAllBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

 

  return  (
    <div className="container-fluid my-4 px-4">
      <h4 className="mb-4 text-center" style={{ fontWeight: 600 }}>
        All Turf Bookings
      </h4>

      {allBookings.length > 0 ? (
        allBookings.map((booking, index) => (
          <div
            key={index}
            className="card shadow-sm mb-4"
            style={{ borderRadius: ".75rem", overflow: "hidden" }}
          >
            <div className="row g-0">
              {/* Turf Image */}
              <div className="col-md-4">
                <img
                  src={
                    booking.turf_id?.image
                      ? `${API_URL}/turf_images/${booking.turf_id.image}`
                      : "https://via.placeholder.com/400x250?text=Turf+Image"
                  }
                  alt="Turf"
                  className="img-fluid w-100"
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Booking Info */}
              <div className="col-md-8">
                <div className="card-body p-4">
                  <h5 style={{ fontWeight: 600 }}>
                    {booking.turf_id?.name || "Unknown Turf"}
                  </h5>
                  <p style={{ fontSize: ".9rem", color: "#6c757d" }}>
                    {booking.turf_id?.address || "No address available"}
                  </p>

                  {/* Booking Details */}
                  <div className="row mt-3">
                    <div className="col-sm-6">
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Date:</strong> {booking.date}
                      </p>
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Slot:</strong> {booking.slot}
                      </p>
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Booking ID:</strong> {booking._id}
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Slot Amount:</strong> ₹{booking.amount}
                      </p>
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Advance Paid:</strong> ₹{booking.advance_amount}
                      </p>
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Remaining:</strong> ₹{booking.remaining_amount}
                      </p>
                    </div>
                  </div>

                  {/* User Details */}
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <h6
                        style={{
                          fontWeight: 600,
                          color: "#0d6efd",
                          marginBottom: ".5rem",
                        }}
                      >
                        User Details
                      </h6>
                      <p style={{ marginBottom: ".3rem" }}>
                        <strong>Name:</strong> {booking.user_id?.name || "N/A"}
                      </p>
                      <p style={{ marginBottom: ".3rem" }}>
                        <strong>Email:</strong> {booking.user_id?.email || "N/A"}
                      </p>
                      <p style={{ marginBottom: ".3rem" }}>
                        <strong>Phone:</strong> {booking.user_id?.phone || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span
                      className={`badge ${
                        booking.status === "Confirmed"
                          ? "bg-success"
                          : booking.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                      style={{ fontSize: ".8rem" }}
                    >
                      {booking.status || "Unknown"}
                    </span>
                    <button className="btn btn-outline-danger btn-sm">
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-warning text-center">
          No bookings found for your turfs.
        </div>
      )}
    </div>
  );
};

export default AllBooking;
