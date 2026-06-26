import React from 'react'
import { NavLink } from 'react-router-dom'
import { IMAGE_BASE_URL } from '../config/Api'

const TurfCardView = (props) => {
  return (
    <>
     <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.2s">
                <div className="blog-item d-flex flex-column" style={{ height: '100%' }}>
                  <div className="blog-img" style={{ height: '300px' }}> {/* Set a fixed height for the image container */}
                    <img
                      src={`${IMAGE_BASE_URL}/turf_images/${props.item.image}`}
                      className="img-fluid rounded-top w-100"
                      alt=""
                      style={{ height: '100%', objectFit: 'cover' }} // Ensure the image fills the container
                    />
                    <div className="blog-date px-4 py-2">&#8377;{props.item.price?props.item.price.toFixed(2):""}</div>
                  </div>
                  <div className="blog-content rounded-bottom p-4 d-flex flex-column justify-content-between" style={{ flexGrow: 1 }}>
                    <div>
                      <br />
                      <a href="#" className="h4 d-inline-block mb-3">{props.item.name}</a>
                      <br />
                      <p><i className="fa fa-map-marker" aria-hidden="true"></i> {props.item.address}</p>
                    
                    <NavLink to={"/turfs/"+props.item._id} className="btn btn-secondary mt-auto">book now</NavLink>
                    </div>
                  </div>
                </div>
              </div>
    </>
  )
}

export default TurfCardView