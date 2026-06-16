import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { API_URL } from "../../config/Api";

const MyProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/user/myprofile`, {
        headers: { Authorization: localStorage.getItem("user_access") },
      })
      .then((response) =>{
         
         console.log(response.data)
         setUser(response.data)
      }
        )    
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "2rem" }}
    >
      <h4 className="mb-4 text-center" style={{ fontWeight: 600 }}>
        My Profile
      </h4>

      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-8 col-md-10">
          <div
            className="card shadow-sm"
            style={{ borderRadius: "1rem", overflow: "hidden", border: "none" }}
          >
            {/* Header */}
            <div
              className="card-header text-white text-center"
              style={{
                background: "linear-gradient(135deg, #0d6efd, #6610f2)",
                padding: "3rem 1rem",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"

                alt="User"
                className="rounded-circle mb-3"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  border: "3px solid #fff",
                }}
              />
              <h5 style={{ fontWeight: 600 }}>{user.name}</h5>
              
            </div>

            {/* Body */}
            <div className="card-body p-4">
              <div className="row mb-3">
                <div className="col-sm-4">
                  <p style={{ fontWeight: 600 }}>Phone</p>
                </div>
                <div className="col-sm-8 text-secondary">
                  {user.contact}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4">
                  <p style={{ fontWeight: 600 }}>Email Id</p>
                </div>
                <div className="col-sm-8 text-secondary">
                  {user.email}
                </div>
              </div>

              

              <div className="row mb-3">
                <div className="col-sm-4">
                  <p style={{ fontWeight: 600 }}>Address</p>
                </div>
                <div className="col-sm-8 text-secondary">
                  {user.address}
                </div>
              </div>

              <div className="text-center mt-4 d-flex justify-content-center gap-3 flex-wrap">
                <NavLink
                to="/user/updateprofile"
                  className="btn btn-primary px-4"
                  style={{ borderRadius: "20px", fontWeight: 500 }}
                >
                  Edit Profile
                </NavLink>
                 <NavLink 
                  className="btn btn-primary px-4"
                  style={{ borderRadius: "20px", fontWeight: 500 }}
                >
                  Change Password
                </NavLink>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
