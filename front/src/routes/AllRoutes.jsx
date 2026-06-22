import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/user/Login";
import SignUp from "../pages/user/SignUp";
import BusinessLogin from "../pages/business/BusinessLogin";
import Logout from "../pages/user/Logout";
import Register from "../pages/business/Register";
import BusinessLogout from "../pages/business/BusinessLogout";
import MyAccount from "../pages/user/MyAccount";
import UserProtectedRoute from "./UserProtectedRoute";
import BusinessProtectedRoute from "./BusinessProtectedRoute";
import MyTurf from "../pages/business/MyTurf";
import BusinessMyAccount from "../pages/business/BusinessMyAccount";
import AddTurfs from "../pages/business/AddTurfs";
import Turfs from "../pages/Turfs";
import TurfsListing from "../pages/TurfListing";
import MyBooking from "../pages/user/MyBooking";
import MyProfile from "../pages/user/MyProfile";
import MyTurfBooking from "../pages/business/MyTurfBooking";
import AllBooking from "../pages/business/AllBooking";
import BusinessMyProfile from "../pages/business/BusinessMyProfile";
import UpdateProfile from "../pages/user/UpdateProfile";
import BusinessUpdateProfile from "../pages/business/BusinessUpdateProfile";
import PaymentSuccess from "../pages/PaymentSuccess";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/turfs/:id" element={<Turfs />} />
        <Route path="/turfs" element={<TurfsListing />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<SignUp />} />
         <Route path='/payment-success' element={<PaymentSuccess/>}/>

        <Route path="/user" element={<UserProtectedRoute />}>
          <Route path="logout" element={<Logout />} />
          <Route path="mybooking" element={<MyBooking />} />
          <Route path="myaccount" element={<MyAccount />} />
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="updateprofile" element={<UpdateProfile />} />
        </Route>

        <Route path="/business/login" element={<BusinessLogin />} />
        <Route path="/business/register" element={<Register />} />

        <Route path="/business" element={<BusinessProtectedRoute />}>
          <Route path="myturf/booking/:id" element={<MyTurfBooking />} />
          <Route path="updateprofile" element={<BusinessUpdateProfile />} />
          <Route path="myprofile" element={<BusinessMyProfile />} />
          <Route path="logout" element={<BusinessLogout />} />
          <Route path="allbooking" element={<AllBooking />} />
          <Route path="myaccount" element={<BusinessMyAccount />} />
          <Route path="myturf" element={<MyTurf />} />
          <Route path="addturf" element={<AddTurfs />} />
        </Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
