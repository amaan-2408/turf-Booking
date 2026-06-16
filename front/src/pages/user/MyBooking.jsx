import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/Api";
import axios from "axios";

const MyBooking = () => {
  const [allBooking, setAllBooking] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/user/mybooking`, {
        headers: { Authorization: localStorage.getItem("user_access") },
      })
      .then((response) => {
        console.log(response.data);
        setAllBooking(response.data);
      })
  }, []);

  return (
    <div className="container-fluid my-4 px-4">
      <h4 className="mb-4 text-center" style={{ fontWeight: 600 }}>
        My Turf Bookings
      </h4>

      {allBooking.length > 0 
      ?
       (
        allBooking.map((item, index) => (
          <div
            key={index}
            className="card shadow-sm mb-4"
            style={{ borderRadius: ".75rem", overflow: "hidden" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={`http://localhost:3000/turf_images/${item?.turf_id?.image}`}
                  alt="Turf"
                  className="img-fluid w-100"
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body p-4">
                  <h5 style={{ fontWeight: 600 }}>
                    {item?.turf_id?.name || ""}
                  </h5>
                  <p style={{ fontSize: ".9rem", color: "#6c757d" }}>
                    {item?.turf_id?.address || ""}
                  </p>

                  <div className="row mt-3">
                    <div className="col-sm-6">
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Date:</strong> {item.date}
                      </p>
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Slot:</strong> {item.slot}
                      </p>
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Booked By:</strong> {item?.user_id?.name || ""}
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Slot Amount:</strong> ₹{item.amount}
                      </p>
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Advance Paid:</strong> ₹{item.advance_amount}
                      </p>
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Remaining:</strong> ₹{item.remaining_amount}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button className="btn btn-outline-danger btn-sm">
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )
       :
        (
        <div className="alert alert-warning text-center">
          <p>No data found</p>
        </div>
      )
      }
    </div>
  );
};

export default MyBooking;
