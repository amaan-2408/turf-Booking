import React, { useRef } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AddTurfSchema from '../../schema/AddTurfSchema'

const AddTurfs = () => {
    let myfile=useRef()
    let navigate=useNavigate()
    let AddTurfFrm = useFormik({
        validationSchema:AddTurfSchema,
        initialValues: {
            name: "",
            price: "",
            address: "",
            contact: "",
            image:"",
            detail: "",
            lat: "",
            long: "",
            time_open: "",
            time_close: ""
        },
        onSubmit:(formData)=>{
            let image=myfile.current.files[0];
            let formDataWithImage= new FormData()
            formDataWithImage.append("image", image);
            formDataWithImage.append("name", formData.name);
            formDataWithImage.append("price", formData.price);
            formDataWithImage.append("address", formData.address);
            formDataWithImage.append("contact", formData.contact);
            formDataWithImage.append("detail", formData.detail);
            formDataWithImage.append("lat", formData.lat);
            formDataWithImage.append("long", formData.long);
            formDataWithImage.append("time_open", formData.time_open);
            formDataWithImage.append("time_close", formData.time_close);

            // console.log(formData);return;
            axios
            .post("http://localhost:3000/api/v1/turfs",formDataWithImage,{ headers:{Authorization:localStorage.getItem("business_access")}})
            .then(Response=>{
                console.log(Response.data);
                navigate("/business/myturf")
                
            })
        }
    })

    let arr = [];
    let Demo = () => {
        arr = [];
        for (let i = 0; i <= 23; i++) {
            arr.push(<option key={i}>{i < 13 ? i : i - 12}:00{i < 12 ? ' AM' : ' PM'}</option>)
        }
        return arr;
    }



    return (
        <>
            <h4>Add Your New Turf</h4>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum tenetur dolorem laudantium itaque cumque delectus et possimus expedita officia! Sed atque ducimus neque quos dicta molestiae odit quasi veritatis ullam.</p>
            <form onSubmit={AddTurfFrm.handleSubmit}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header bg-secondary">
                            <h4 className='text-center p-1 text-light'>Add</h4>
                        </div>
                        <div className="card-body bg-dark">
                            <div className="mt-3">
                                <label className='text-light'>Turf Name</label>
                                <input name="name" onChange={AddTurfFrm.handleChange} type="text" className={'form-control '+(AddTurfFrm.errors.name&&AddTurfFrm.touched.name?"is-invalid":" ")} />
                            </div>
                           
                            <div className="mt-3">
                                <label className='text-light'>Price</label>
                                <input name="price" onChange={AddTurfFrm.handleChange} type="text" className={'form-control '+(AddTurfFrm.errors.price&&AddTurfFrm.touched.price?"is-invalid":" ")} />
                            </div>
                          
                            <div className="mt-3">
                                <label className='text-light'>Contact Number (Manager)</label>
                                <input name="contact" onChange={AddTurfFrm.handleChange} type="text" className={'form-control '+(AddTurfFrm.errors.contact&&AddTurfFrm.touched.contact?"is-invalid":" ")} />
                            </div>
                             <div className="mt-3">
                                <label className='text-light'>Turf Image</label>
                                <input name="image" ref={myfile} onChange={AddTurfFrm.handleChange} type="file" className={'form-control '+(AddTurfFrm.errors.contact&&AddTurfFrm.touched.contact?"is-invalid":" ")} />
                            </div>
                            
                            <div className="mt-3">
                                <label className='text-light'>Turf Detail</label>
                                <textarea name="detail" onChange={AddTurfFrm.handleChange} type="text" className={'form-control '+(AddTurfFrm.errors.detail&&AddTurfFrm.touched.detail?"is-invalid":" ")} ></textarea>
                            </div>
                           
                            <div className="mt-3">
                                <label className='text-light'>Address</label>
                                <textarea name="address" onChange={AddTurfFrm.handleChange} type="text" className={'form-control '+(AddTurfFrm.errors.address&&AddTurfFrm.touched.address?"is-invalid":" ")} ></textarea>
                            </div>
                           
                            <div className="mt-3">
                                <label className='text-light'>Longitude & Latitude</label>
                                <br />
                                <small className='text-light'>if you want to show turf  in google map ,then select latitude and longitude from <a href="https://www.latlong.net/" target='_blank' style={{ color: 'tomato' }}>here</a>  (optional)
                                </small>
                                <div className="row">
                                    <div className="col-md-1">
                                        <label htmlFor="" className='text-light'>Lat</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input name="lat" onChange={AddTurfFrm.handleChange} type='text' className={'form-control '+(AddTurfFrm.errors.lat&&AddTurfFrm.touched.lat?"is-invalid":" ")}></input>
                                    </div>
                                    
                                    <div className="col-md-1">
                                        <label htmlFor="" className='text-light'>Long</label>
                                    </div>
                                    <div className="col-md-5">
                                        <input name="long" onChange={AddTurfFrm.handleChange} type='text' className={'form-control '+(AddTurfFrm.errors.long&&AddTurfFrm.touched.long?"is-invalid":" ")}></input>
                                    </div>
                                    
                                </div>

                            </div>

                            <div className="mt-3">
                                <label htmlFor="" className='text-light'>time</label>
                                <div className="my-2 row">
                                    <div className="col-md-1">
                                        <label htmlFor="" className='text-light'>Open</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select name="time_open" onChange={AddTurfFrm.handleChange} className={'form-control '+(AddTurfFrm.errors.time_open&&AddTurfFrm.touched.time_open?"is-invalid":" ")}>
                                            <option value=''>select</option>
                                            {Demo()}
                                        </select>
                                    </div>
                                   
                                    <div className="col-md-1">
                                        <label htmlFor="" className='text-light'>Close</label>
                                    </div>
                                    <div className="col-md-5">
                                        <select name="time_close" onChange={AddTurfFrm.handleChange} className={'form-control '+(AddTurfFrm.errors.time_close&&AddTurfFrm.touched.time_close?"is-invalid":" ")}>
                                            <option value=''>select</option>

                                            {Demo()}
                                        </select>
                                    </div>
                                     
                                      
                                </div>
                            </div>

                        </div>
                        <div className="card-footer ">
                            <button type='submit' className='text-light btn btn-secondary'>Add Turf</button>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </>
    )
}

export default AddTurfs


