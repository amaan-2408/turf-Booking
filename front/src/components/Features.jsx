import React from 'react'

const Features = () => {
  return (
    <>
      <div className="container-fluid feature bg-light py-5">
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
            <h4 className="text-uppercase text-success">Our Feature</h4>
            <h1 className="display-3 text-capitalize mb-3">Game ON Turf: Find and Book Your Perfect turf</h1>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
              <div className="feature-item p-4 ">
                <div className="feature-icon mb-3"><i className="fas fa-user-clock text-white fa-3x"></i></div>
                <b  className="h4 mb-3">Easy Booking</b>
                <p className="mb-3">Browse availability and book your turf in a few clicks. Check real-time slots and secure your game</p>
                <a href="#" className="btn text-secondary">Read More <i className="fa fa-angle-right"></i></a>
              </div>
            </div>
            {/* <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.4s">
              <div className="feature-item p-4">
                <div className="feature-icon mb-3"><i className="fas fa-map-pin text-white fa-3x"></i></div>
                <a href="#" className="h4 mb-3">Wide Selection</a>
                <p className="mb-3">Discover a variety of well-maintained turfs across Indore. Find the perfect ground for your sport</p>
                <a href="#" className="btn text-secondary">Read More <i className="fa fa-angle-right"></i></a>
              </div>
            </div> */}
             <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.6s">
              <div className="feature-item p-4">
                <div className="feature-icon mb-3"><i className="fas fa-map-pin text-white fa-3x"></i></div>
                <b  className="h4 mb-3">Wide Selection</b>
                <p className="mb-3">Discover a variety of well-maintained turfs across Indore. Find perfect Turf for your sport</p>
                <a href="#" className="btn text-secondary">Read More <i className="fa fa-angle-right"></i></a>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.6s">
              <div className="feature-item p-4">
                <div className="feature-icon mb-3"><i className="fas fa-credit-card text-white fa-3x"></i></div>
                <b  className="h4 mb-3">Secure Payments</b>
                <p className="mb-3">Enjoy hassle-free and secure online payment options. Your booking is confirmed instantly</p>
                <a href="#" className="btn text-secondary">Read More <i className="fa fa-angle-right"></i></a>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.8s">
              <div className="feature-item p-4">
                <div className="feature-icon mb-3"><i className="fas fa-star text-white fa-3x"></i></div>
                <b  className="h4 mb-3">Ratings & Reviews</b>
                <p className="mb-3">See what other players are saying. Read genuine reviews to help you choose the best turf</p>
                <a href="#" className="btn text-secondary">Read More <i className="fa fa-angle-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Features