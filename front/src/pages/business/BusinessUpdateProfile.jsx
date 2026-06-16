import React, { useEffect,useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { useFormik } from "formik"
import axios from "axios"
import BusinessUpdateProfileSchema from '../../schema/BusinessUpdateProfileSchema'
import { API_URL } from "../../config/Api";

const BusinessUpdateProfile = () => {

  let [business, setBusiness] = useState({
    name: "",
    email: "",
    address: "",
  })
  let navigate=useNavigate();
  
  useEffect(() => {
    axios
      .get(`${API_URL}/business/myprofile`, {
        headers: { Authorization: localStorage.getItem("business_access") },
      })
      .then((response) =>{
         
         console.log(response.data)
         setBusiness(response.data)
      }
        )    
  }, []);

  let UpdateProfileFrm = useFormik({
    enableReinitialize:true,
    validationSchema: BusinessUpdateProfileSchema,
    initialValues: business,
    onSubmit: (FormData) => {
      localStorage.setItem("name",FormData.name)
       axios
      .put(`${API_URL}/business/updateprofile`,FormData,{ headers: { Authorization: localStorage.getItem("business_access") },})
      .then((response) =>{
       navigate("/business/myprofile")
      }
    )
    }
  })
  return (
    <>
      <div className='container my-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <form action="" onSubmit={UpdateProfileFrm.handleSubmit}>
              <div className="card">
                <div className='card-header bg-secondary'>
                  <h4 className='text-center p-2 text-light'>business Update Profile</h4>
                </div>
                <div className='card-body'>
                  <div className='mt-4'>
                    <label >Name</label>
                    <input type="text" name='name' value={UpdateProfileFrm.values.name} onChange={UpdateProfileFrm.handleChange} placeholder='Name' className={'form-control ' + (UpdateProfileFrm.errors.name && UpdateProfileFrm.touched.name ? "is-invalid" : "")} />
                  </div>
                  {
                    UpdateProfileFrm.errors.name && UpdateProfileFrm.touched.name
                      ? <small className="text-danger">{UpdateProfileFrm.errors.name}</small>
                      :
                      ""
                  }
                  <div className='mt-4'>
                    <label >Email Id</label>
                    <input type="text" disabled={true} name='email' value={UpdateProfileFrm.values.email} onChange={UpdateProfileFrm.handleChange} placeholder='email' className={'form-control ' + (UpdateProfileFrm.errors.email && UpdateProfileFrm.touched.email ? "is-invalid" : "")} />
                  </div>
                  {
                    UpdateProfileFrm.errors.email && UpdateProfileFrm.touched.email
                      ? <small className="text-danger">{UpdateProfileFrm.errors.email}</small>
                      :
                      ""
                  }
                  <div className='mt-4'>
                    <label >Contact Number</label>
                    <input type="text" name='contact' value={UpdateProfileFrm.values.contact} onChange={UpdateProfileFrm.handleChange} placeholder='Contact' className={'form-control ' + (UpdateProfileFrm.errors.contact && UpdateProfileFrm.touched.contact ? "is-invalid" : "")} />
                  </div>
                  {
                    UpdateProfileFrm.errors.address && UpdateProfileFrm.touched.address
                      ? <small className="text-danger">{UpdateProfileFrm.errors.address}</small>
                      :
                      ""
                  }
                </div>
                <div className='card-footer'>
                  <button type='submit' className='btn btn-secondary'>Update</button>

                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessUpdateProfile;