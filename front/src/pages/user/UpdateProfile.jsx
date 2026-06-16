import React, { useEffect,useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { useFormik } from "formik"
import axios from "axios"
import UserUpdateProfileSchema from '../../schema/UserUpdateProfileSchema'
import { API_URL } from "../../config/Api";

const UpdateProfile = () => {

  let [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  })
  let navigate=useNavigate();
  
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

  let UpdateProfileFrm = useFormik({
    enableReinitialize:true,
    validationSchema: UserUpdateProfileSchema,
    initialValues: user,
    onSubmit: (FormData) => {
      localStorage.setItem("name",FormData.name)
       axios
      .put(`${API_URL}/user/updateprofile`,FormData,{ headers: { Authorization: localStorage.getItem("user_access") },})
      .then((response) =>{
       navigate("/user/myprofile")
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
                  <h4 className='text-center p-2 text-light'>User Update Profile</h4>
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
                    <input type="text" disabled={true} name='email' value={UpdateProfileFrm.values.email} onChange={UpdateProfileFrm.handleChange} placeholder='Name' className={'form-control ' + (UpdateProfileFrm.errors.email && UpdateProfileFrm.touched.email ? "is-invalid" : "")} />
                  </div>
                  {
                    UpdateProfileFrm.errors.email && UpdateProfileFrm.touched.email
                      ? <small className="text-danger">{UpdateProfileFrm.errors.email}</small>
                      :
                      ""
                  }
                  <div className='mt-4'>
                    <label >Address</label>
                    <input type="text" name='address' value={UpdateProfileFrm.values.address} onChange={UpdateProfileFrm.handleChange} placeholder='Name' className={'form-control ' + (UpdateProfileFrm.errors.address && UpdateProfileFrm.touched.address ? "is-invalid" : "")} />
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

export default UpdateProfile;