import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom'
import { API_URL } from "../../config/Api";

const MyTurf = () => {
  const [turfs, setTurfs] = useState([]);
  let navigate=useNavigate();

useEffect(() => {
    axios
      .get(`${API_URL}/turfs/allturf`, {
        headers: { Authorization: localStorage.getItem("business_access") },
      })
      .then((response) =>{
         
         console.log(response.data)
         setTurfs(response.data)
      }
        )    
  }, []);
  
  let goToMyBooking=(id)=>{
    navigate("/business/myturf/booking/"+id)
  }

  return (
    <div className="container-fluid py-4 px-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 style={{ fontWeight: 600 }}>My Turf Listings</h4>
        <NavLink to="/business/addturf" className="btn btn-primary px-3">
          <i className="bi bi-plus-circle me-2"></i>Add New Turf
        </NavLink>
      </div>

      {turfs.length > 0 ? (
        <div className="row">
          {turfs.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card shadow-sm h-100" style={{ borderRadius: ".75rem", overflow: "hidden" }}>
                <img
                  src={"http://localhost:3000/turf_images/"+item.image}
                  alt=""
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title mb-1" style={{ fontWeight: 600 }}>
                    {item.name}
                  </h5>
                  <p className="text-muted mb-2" style={{ fontSize: ".9rem" }}>
                    {item.address}
                  </p>

                  <p className="mb-1">
                    <strong>Price/Slot:</strong> ₹{item.price}
                  </p>
                  <p className="mb-1">
                    <strong>contact Number:</strong> {item.contact}
                  </p>
                  <p className="mb-1">
                    <strong>Timing:</strong> {item.time_open}-{item.time_close}
                  </p>
                 

                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-pencil-square me-1"></i>Edit
                    </button>
                    <button onClick={()=>goToMyBooking(item._id)} className="btn btn-outline-success btn-sm">
                     <i className="bi bi-calendar-check me-1"></i>view booking
                    </button>

                    <button className="btn btn-outline-danger btn-sm">
                      <i className="bi bi-trash me-1"></i>Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning text-center">
          No turfs found. Add your first turf!
        </div>
      )}
    </div>
  )
}

export default MyTurf