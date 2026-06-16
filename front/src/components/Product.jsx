import React from 'react'

const Product = () => {
  return (
    <>{/* Products Start */}
      <div className="container-fluid product py-5">
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
            <h4 className="text-uppercase text-primary">Our Products</h4>
            <h1 className="display-3 text-capitalize mb-3">We Deliver Best Quality Bottle Packs.</h1>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.2s">
              <div className="product-item">
                <img src="img/product-3.png" className="img-fluid w-100 rounded-top" alt="Image" />
                <div className="product-content bg-light text-center rounded-bottom p-4">
                  <p>2L 1 Bottle</p>
                  <a href="#" className="h4 d-inline-block mb-3">Mineral Water Bottle</a>
                  <p className="fs-4 text-primary mb-3">$35:00</p>
                  <a href="#" className="btn btn-secondary rounded-pill py-2 px-4">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.4s">
              <div className="product-item">
                <img src="img/product-2.png" className="img-fluid w-100 rounded-top" alt="Image" />
                <div className="product-content bg-light text-center rounded-bottom p-4">
                  <p>4L 2 Bottles</p>
                  <a href="#" className="h4 d-inline-block mb-3">RO Water Bottle</a>
                  <p className="fs-4 text-primary mb-3">$70:00</p>
                  <a href="#" className="btn btn-secondary rounded-pill py-2 px-4">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.6s">
              <div className="product-item">
                <img src="img/product-1.png" className="img-fluid w-100 rounded-top" alt="Image" />
                <div className="product-content bg-light text-center rounded-bottom p-4">
                  <p>6L 3 Bottles</p>
                  <a href="#" className="h4 d-inline-block mb-3">UV Water Bottle</a>
                  <p className="fs-4 text-primary mb-3">$100:00</p>
                  <a href="#" className="btn btn-secondary rounded-pill py-2 px-4">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Product
      