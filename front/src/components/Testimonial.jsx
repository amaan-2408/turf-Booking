import React from 'react';

const Testimonial = () => {
  return (
    <div className="container-fluid testimonial pb-5">
      <div className="container pb-5">
        <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
          <h4 className="text-uppercase text-success">Testimonials</h4>
          <h1 className="display-3 text-capitalize mb-3">Our clients reviews.</h1>
        </div>
        <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.3s">
          <div className="testimonial-item text-center p-4">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt pariatur officiis quis molestias, sit iure sunt voluptatibus accusantium laboriosam dolore.</p>
            <div className="d-flex justify-content-center mb-4">
              <img src="img/testimonial-1.jpg" className="img-fluid border border-4 border-primary" style={{ width: '100px', height: '100px', borderRadius: '50px' }} alt="" />
            </div>
            <div className="d-block">
              <h4 className="text-dark">Client Name</h4>
              <p className="m-0 pb-3">Profession</p>
              <div className="d-flex justify-content-center text-secondary">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
          <div className="testimonial-item text-center p-4">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt pariatur officiis quis molestias, sit iure sunt voluptatibus accusantium laboriosam dolore.</p>
            <div className="d-flex justify-content-center mb-4">
              <img src="img/testimonial-2.jpg" className="img-fluid border border-4 border-primary" style={{ width: '100px', height: '100px', borderRadius: '50px' }} alt="" />
            </div>
            <div className="d-block">
              <h4 className="text-dark">Client Name</h4>
              <p className="m-0 pb-3">Profession</p>
              <div className="d-flex justify-content-center text-secondary">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
          <div className="testimonial-item text-center p-4">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt pariatur officiis quis molestias, sit iure sunt voluptatibus accusantium laboriosam dolore.</p>
            <div className="d-flex justify-content-center mb-4">
              <img src="img/testimonial-3.jpg" className="img-fluid border border-4 border-primary" style={{ width: '100px', height: '100px', borderRadius: '50px' }} alt="" />
            </div>
            <div className="d-block">
              <h4 className="text-dark">Client Name</h4>
              <p className="m-0 pb-3">Profession</p>
              <div className="d-flex justify-content-center text-secondary">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
          <div className="testimonial-item text-center p-4">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt pariatur officiis quis molestias, sit iure sunt voluptatibus accusantium laboriosam dolore.</p>
            <div className="d-flex justify-content-center mb-4">
              <img src="img/testimonial-3.jpg" className="img-fluid border border-4 border-primary" style={{ width: '100px', height: '100px', borderRadius: '50px' }} alt="" />
            </div>
            <div className="d-block">
              <h4 className="text-dark">Client Name</h4>
              <p className="m-0 pb-3">Profession</p>
              <div className="d-flex justify-content-center text-secondary">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;