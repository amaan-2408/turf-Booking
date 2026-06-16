import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
const About = () => {
  let [name,setName]=useState("");
  let [age,setAge]=useState("");

  let [info,setInfo]=useState({
    email:"",
    contact:"",
    gender:""
  })
  let demo =()=>{
    console.log(info)
  }
  return (

    <>
      {/* About Start */}
      <div className="container-fluid about overflow-hidden py-5">
        <div className="container py-5">
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
          <h1>{name}</h1>
           <input type="text" value={age} onChange={(e)=>setAge(e.target.value)}/>
          <h1>{age}</h1>

          <input type="text" placeholder='email' value={info.email} onChange={(e)=>setInfo({...info, email : e.target.value})}/>
          <br />
          <input type="text"  placeholder='contact' value={info.contact} onChange={(e)=>setInfo({...info, contact : e.target.value})}/>
          <br />
          <input type="text"  laceholder='gender' value={info.gender} onChange={(e)=>setInfo({...info, gender : e.target.value})}/>
          <br />
          <button onClick={demo}>ok</button>

















          {/* <div className="row g-5">
            <div className="col-xl-6 wow fadeInLeft" data-wow-delay="0.2s">
              <div className="about-img rounded h-100">
                <img src="img/ABOUT-TURF.jpg" className="img-fluid rounded h-100 w-100" style={{ objectFit: 'cover' }} alt="" />
                <div className="about-exp">
                  <span>New In City</span>
                </div>
              </div>
            </div>
            <div className="col-xl-6 wow fadeInRight" data-wow-delay="0.2s">
              <div className="about-item">
                <h4 className="text-primary text-uppercase">About GameOnTurf</h4>
                <h1 className="display-3 mb-3">Easy Turf Booking Online</h1>
                <p className="mb-4">
                  Welcome to our online platform for booking turfs in and around Indore city! We understand how challenging and time-consuming it can be to find and book a turf for your sports activities, which is why we created this platform to simplify the process and make it more accessible for everyone.
                  <br />
                  <br />
                  Our platform offers a hassle-free and user-friendly experience for booking turfs online. We have partnered with a wide range of turf owners in and around Indore city to provide you with a wide range of options to choose from. Whether you're looking for a cricket pitch, football ground, or any other sports turf, you can easily browse through our selection and book your preferred turf with just a few clicks.
                <br />
                <br />
                Gone are the days when you have to call up turf owners or physically visit the turfs to check for availability. With our platform, you can easily check for available slots, choose the one that fits your schedule, and make the booking instantly. Our platform also offers a secure payment gateway to ensure that your transactions are safe and hassle-free.
                </p>
              
                <NavLink to="/register" className="btn btn-secondary rounded-pill py-3 px-5">Register Today</NavLink>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* About End */}
    </>
  );
};

export default About;