
import React ,{useState,useEffect} from 'react'
import Features from '../components/Features'
import Testimonial from "../components/Testimonial"
import axios from "axios"
import { NavLink } from 'react-router-dom'
import TurfCardView from '../ui/TurfCardView'

const Home = () => {
  let [allTurf,setAllTurf]=useState([])
  useEffect(()=>{
    axios
    .get("http://localhost:3000/api/v1/turfs")
    .then(response=>{
      setAllTurf(response.data)
    })

  },[])


  return (
    <>
    {/* Blog Start */}
    {/* <div style={{marginTop:"100px"}}>
      <div className="container-fluid blog pb-5">
        <div className="container pb-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
            <h4 className="text-uppercase text-primary">Turf</h4>
            <h1 className="display-3 text-capitalize mb-3">Latest Turf</h1>
          </div>

          <div className="row g-4 justify-content-center">
            {
              allTurf.map(item=>{
                    return(
                       <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.2s">
               <div className="blog-item">
                <div className="blog-img">
                  <img src={"http://localhost:3000/images/"+item.img} className="img-fluid rounded-top w-100" alt="" />
                  <div className="blog-date px-4 py-2">&#8377;{item.price.toFixed(2)}</div>
                </div>
                <div className="blog-content rounded-bottom p-4">
                  <a href="#" className="h4 d-inline-block mb-3">{item.title}</a>
                  <p><i class="fas fa-location-arrow"></i> {item.adress}</p>
                  <button className="btn btn-secondary">book now</button>
                </div>
              </div> 
            </div>
                    )
            })
          }
           
          </div>
         
        </div>
      </div>
      </div> */}
     <div style={{marginTop:"100px"}}>
  <div className="container-fluid blog pb-5">
    <div className="container pb-5">
      <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
        <h4 className="text-uppercase text-primary">Turf</h4>
        <h1 className="display-3 text-capitalize mb-3">Latest Turf</h1>
      </div>

      <div className="row g-4 justify-content-center">
        {
          allTurf.map(item => {
            return (
              <TurfCardView item={item} />
            )
          })
        }
      </div>
    </div>
  </div>
</div>
      {/* Blog End */}
      <Features/>
      <Testimonial/>
    </>
  )
}

export default Home