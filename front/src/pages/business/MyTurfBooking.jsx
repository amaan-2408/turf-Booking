import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom'
import { API_URL } from "../../config/Api";

import { useParams } from 'react-router-dom'

const MyTurfBooking = () => {
    const [bookings, setBookings] = useState([]);
  let param=useParams();
  let id=param.id;

  useEffect(() => {
    axios
      .get(`${API_URL}/booking/getbyturfid/${id}`)
      .then((response) =>{
         
         console.log(response.data)
         setBookings(response.data)
         
        
      }
        )    
  }, []);
  return (
    <div
      className="container-fluid py-4 px-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <h4 className="text-center mb-4" style={{ fontWeight: 600 }}>
        {bookings.length > 0 ? bookings[0].turf_id.name : 'hello'} Bookings
      </h4>

      {bookings.length > 0 ? (
        bookings.map((item, index) => (
          <div
            key={index}
            className="card shadow-sm mb-3"
            style={{ borderRadius: ".75rem", overflow: "hidden" }}
          >
            <div className="row g-0 align-items-center">
              <div className="col-md-4">
                <img
                   src={"http://localhost:3000/turf_images/" + item.turf_id ? item.turf_id.image : ""}
                  alt="Turf"
                  className="img-fluid w-100"
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    minHeight: "180px",
                  }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body p-3">
                  <h5 style={{ fontWeight: 600 }}>
                    {item.turf_id ? item.turf_id.name: "Turf Name"}
                  </h5>
                  <p style={{ color: "#6c757d", fontSize: ".9rem" }}>
                    {item.turf_id ? item.turf_id.address : ""}
                  </p>

                  <div className="row mt-2">
                    <div className="col-sm-6">
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Date:</strong> {item.date}
                      </p>
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Slot:</strong> {item.slot ? item.slot.join(", ") : ""}
                      </p>
                      <p style={{ marginBottom: ".4rem" }}>
                        <strong>Booked By:</strong>{" "}
                        {item.user_id ? item.user_id.name : ""}
                      </p>
                       <p style={{ marginBottom: ".4rem" }}>
                        <strong>Contact Number:</strong>{" "}
                        {item.user_id ? item.user_id.contact : ""}
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
      ) : (
        <div className="alert alert-warning text-center mt-4">
          No bookings found for this turf.
        </div>
      )}
    </div>
  

  )
}

export default MyTurfBooking