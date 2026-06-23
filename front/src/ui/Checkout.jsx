import { useState } from 'react'                                                                                                                                                            
                                                                                                                                                                                              
  const Checkout = ({                                                                                                                                                                         
    turf,                                                                                                                                                                                     
    startDate,                                                                                                                                                                                
    timingSlotArr,                                                                                                                                                                            
    discount,                                                                                                                                                                                 
    setDiscount,                                                                                                                                                                              
    handleBook,                                                                                                                                                                               
    handleStripePayment,                                                                                                                                                                      
    totalAmount,                                                                                                                                                                              
  }) => {                                                                                                                                                                                     
    const [paymentChoice, setPaymentChoice] = useState('stripe')                                                                                                                              
    const [couponApplied, setCouponApplied] = useState(false)                                                                                                                                 
    const [isProcessing, setIsProcessing] = useState(false)                                                                                                                                   
                                                                                                                                                                                              
    const formatDate = (date) =>                                                                                                                                                              
      date.toLocaleDateString('en-IN', {                                                                                                                                                      
        weekday: 'short',                                                                                                                                                                     
        day: 'numeric',                                                                                                                                                                       
        month: 'short',                                                                                                                                                                       
        year: 'numeric',                                                                                                                                                                      
      })                                                                                                                                                                                      
                                                                                                                                                                                              
    const formatRupees = (n) => `₹${(n || 0).toLocaleString('en-IN')}`                                                                                                                        
                                                                                                                                                                                              
    const computedTotal = totalAmount ?? (turf.price || 0) * (timingSlotArr.length || 0)                                                                                                      
    const finalAmount = Math.max(0, computedTotal - (discount || 0))                                                                                                                          
    const advanceAmount = Math.round(finalAmount * 0.25)                                                                                                                                      
    const remainingAmount = finalAmount - advanceAmount                                                                                                                                       
                                                                                                                                                                                              
    const handleApplyCoupon = () => {                                                                                                                                                         
      if (couponApplied) return                                                                                                                                                               
      setDiscount(100)                                                                                                                                                                        
      setCouponApplied(true)                                                                                                                                                                  
    }                                                                                                                                                                                         
                                                                                                                                                                                              
    const handleRemoveCoupon = () => {                                                                                                                                                        
      setDiscount(0)                                                                                                                                                                          
      setCouponApplied(false)                                                                                                                                                                 
    }                                                                                                                                                                                         
                                                                                                                                                                                              
    const handleConfirm = () => {                                                                                                                                                             
      setIsProcessing(true)                                                                                                                                                                   
      if (paymentChoice === 'stripe') {                                                                                                                                                       
        handleStripePayment(finalAmount)                                                                                                                                                      
      } else {                                                                                                                                                                                
        handleBook(advanceAmount, finalAmount, remainingAmount)                                                                                                                               
      }                                                                                                                                                                                       
    }                                                                                                                                                                                         
                                                                                                                                                                                              
    return (                                                                                                                                                                                  
      <main className="checkout-page">                                                                                                                                                        
        <div className="container">                                                                                                                                                           
          <div className="dashboard-header">                                                                                                                                                  
            <div>                                                                                                                                                                             
              <h1>Confirm your booking</h1>                                                                                                                                                   
              <p>Review the details below and complete your payment.</p>                                                                                                                      
            </div>                                                                                                                                                                            
          </div>                                                                                                                                                                              
                                                                                                                                                                                              
          <div className="checkout-grid">                                                                                                                                                     
            {/* Left: booking details */}                                                                                                                                                     
            <div>                                                                                                                                                                             
              <div className="checkout-card">                                                                                                                                                 
                <h3>                                                                                                                                                                          
                  <i className="fa fa-futbol"></i>Booking details                                                                                                                             
                </h3>                                                                                                                                                                         
                                                                                                                                                                                              
                <div className="checkout-row">                                                                                                                                                
                  <span className="label">Turf</span>                                                                                                                                         
                  <span className="value large">{turf.name}</span>                                                                                                                            
                </div>                                                                                                                                                                        
                                                                                                                                                                                              
                {turf.address && (                                                                                                                                                            
                  <div className="checkout-row">                                                                                                                                              
                    <span className="label">Location</span>                                                                                                                                   
                    <span className="value muted">{turf.address}</span>                                                                                                                       
                  </div>                                                                                                                                                                      
                )}                                                                                                                                                                            
                                                                                                                                                                                              
                <div className="checkout-row">                                                                                                                                                
                  <span className="label">Date</span>                                                                                                                                         
                  <span className="value">{formatDate(startDate)}</span>                                                                                                                      
                </div>                                                                                                                                                                        
                                                                                                                                                                                              
                <div className="checkout-row">                                                                                                                                                
                  <span className="label">Time slots</span>                                                                                                                                   
                  <span className="value">                                                                                                                                                    
                    {timingSlotArr.length > 0                                                                                                                                                 
                      ? timingSlotArr.join(', ')                                                                                                                                              
                      : '—'}                                                                                                                                                                  
                  </span>                                                                                                                                                                     
                </div>                                                                                                                                                                        
                                                                                                                                                                                              
                <div className="checkout-row">                                                                                                                                                
                  <span className="label">Total hours</span>                                                                                                                                  
                  <span className="value">                                                                                                                                                    
                    {timingSlotArr.length} hour                                                                                                                                               
                    {timingSlotArr.length !== 1 ? 's' : ''}                                                                                                                                   
                  </span>                                                                                                                                                                     
                </div>                                                                                                                                                                        
                                                                                                                                                                                              
                {/* Coupon */}                                                                                                                                                                
                <div style={{ marginTop: 'var(--space-4)' }}>                                                                                                                                 
                  <h3 style={{ marginBottom: 'var(--space-3)' }}>                                                                                                                             
                    <i className="fa fa-ticket"></i>Have a coupon?                                                                                                                            
                  </h3>                                                                                                                                                                       
                  {couponApplied ? (                                                                                                                                                          
                    <div className="coupon-card applied">                                                                                                                                     
                      <div className="coupon-icon">                                                                                                                                           
                        <i className="fa fa-check"></i>                                                                                                                                       
                      </div>                                                                                                                                                                  
                      <div className="coupon-info">                                                                                                                                           
                        <div className="code">WELCOME100</div>                                                                                                                                
                        <p className="desc">                                                                                                                                                  
                          You saved {formatRupees(discount)} on this booking                                                                                                                  
                        </p>                                                                                                                                                                  
                      </div>                                                                                                                                                                  
                      <button                                                                                                                                                                 
                        onClick={handleRemoveCoupon}                                                                                                                                          
                        className="btn btn-sm btn-outline-secondary"                                                                                                                          
                      >                                                                                                                                                                       
                        Remove                                                                                                                                                                
                      </button>                                                                                                                                                               
                    </div>                                                                                                                                                                    
                  ) : (                                                                                                                                                                       
                    <div className="coupon-card">                                                                                                                                             
                      <div className="coupon-icon">                                                                                                                                           
                        <i className="fa fa-tag"></i>                                                                                                                                         
                      </div>                                                                                                                                                                  
                      <div className="coupon-info">                                                                                                                                           
                        <div className="code">WELCOME100</div>                                                                                                                                
                        <p className="desc">                                                                                                                                                  
                          Get {formatRupees(100)} off on your booking                                                                                                                         
                        </p>                                                                                                                                                                  
                      </div>                                                                                                                                                                  
                      <button                                                                                                                                                                 
                        onClick={handleApplyCoupon}                                                                                                                                           
                        className="btn btn-sm btn-primary"                                                                                                                                    
                      >                                                                                                                                                                       
                        Apply                                                                                                                                                                 
                      </button>                                                                                                                                                               
                    </div>                                                                                                                                                                    
                  )}                                                                                                                                                                          
                </div>                                                                                                                                                                        
              </div>                                                                                                                                                                          
            </div>                                                                                                                                                                            
                                                                                                                                                                                              
            {/* Right: payment summary */}                                                                                                                                                    
            <aside>                                                                                                                                                                           
              <div className="booking-card" style={{ position: 'static' }}>                                                                                                                   
                <div className="booking-card-header">                                                                                                                                         
                  <h2>Payment</h2>                                                                                                                                                            
                </div>                                                                                                                                                                        
                                                                                                                                                                                              
                <div                                                                                                                                                                          
                  className="price-summary"                                                                                                                                                   
                  style={{ marginBottom: 'var(--space-4)' }}                                                                                                                                  
                >                                                                                                                                                                             
                  <div className="price-row">                                                                                                                                                 
                    <span className="label">                                                                                                                                                  
                      ₹{turf.price} × {timingSlotArr.length} hour                                                                                                                             
                      {timingSlotArr.length !== 1 ? 's' : ''}                                                                                                                                 
                    </span>                                                                                                                                                                   
                    <span className="value">                                                                                                                                                  
                      {formatRupees((turf.price || 0) * timingSlotArr.length)}                                                                                                                
                    </span>                                                                                                                                                                   
                  </div>                                                                                                                                                                      
                  {discount > 0 && (                                                                                                                                                          
                    <div className="price-row">                                                                                                                                               
                      <span className="label">Coupon discount</span>                                                                                                                          
                      <span                                                                                                                                                                   
                        className="value"                                                                                                                                                     
                        style={{ color: 'var(--color-success)' }}                                                                                                                             
                      >                                                                                                                                                                       
                        − {formatRupees(discount)}                                                                                                                                            
                      </span>                                                                                                                                                                 
                    </div>                                                                                                                                                                    
                  )}                                                                                                                                                                          
                  <div className="price-row total">                                                                                                                                           
                    <span className="label">Total payable</span>                                                                                                                              
                    <span className="value">{formatRupees(finalAmount)}</span>                                                                                                                
                  </div>                                                                                                                                                                      
                </div>                                                                                                                                                                        
                                                                                                                                                                                              
                <label                                                                                                                                                                        
                  className="booking-section-label"                                                                                                                                           
                  style={{ marginBottom: 'var(--space-3)' }}                                                                                                                                  
                >                                                                                                                                                                             
                  Choose payment option                                                                                                                                                       
                </label>                                                                                                                                                                      
                                                                                                                                                                                              
                <div className="payment-options">                                                                                                                                             
                  {/* Stripe full payment */}                                                                                                                                                 
                  <div                                                                                                                                                                        
                    className={`payment-option ${                                                                                                                                             
                      paymentChoice === 'stripe' ? 'selected' : ''                                                                                                                            
                    }`}                                                                                                                                                                       
                    onClick={() => setPaymentChoice('stripe')}                                                                                                                                
                  >                                                                                                                                                                           
                    <div className="payment-option-icon">                                                                                                                                     
                      <i className="fab fa-cc-stripe"></i>                                                                                                                                    
                    </div>                                                                                                                                                                    
                    <div className="payment-option-body">                                                                                                                                     
                      <p className="title">Pay full amount</p>                                                                                                                                
                      <p className="desc">                                                                                                                                                    
                        Secure online payment via Stripe                                                                                                                                      
                      </p>                                                                                                                                                                    
                    </div>                                                                                                                                                                    
                    <div className="payment-option-amount">                                                                                                                                   
                      {formatRupees(finalAmount)}                                                                                                                                             
                    </div>                                                                                                                                                                    
                  </div>                                                                                                                                                                      
                                                                                                                                                                                              
                  {/* 25% advance booking (no payment) */}                                                                                                                                    
                  <div                                                                                                                                                                        
                    className={`payment-option ${                                                                                                                                             
                      paymentChoice === 'advance' ? 'selected' : ''                                                                                                                           
                    }`}                                                                                                                                                                       
                    onClick={() => setPaymentChoice('advance')}                                                                                                                               
                  >                                                                                                                                                                           
                    <div className="payment-option-icon">                                                                                                                                     
                      <i className="fa fa-percent"></i>                                                                                                                                       
                    </div>                                                                                                                                                                    
                    <div className="payment-option-body">                                                                                                                                     
                      <p className="title">Pay 25% advance (book now)</p>                                                                                                                     
                      <p className="desc">                                                                                                                                                    
                        Pay {formatRupees(advanceAmount)} now,{' '}                                                                                                                           
                        {formatRupees(remainingAmount)} at the venue                                                                                                                          
                      </p>                                                                                                                                                                    
                    </div>                                                                                                                                                                    
                    <div className="payment-option-amount">                                                                                                                                   
                      {formatRupees(advanceAmount)}                                                                                                                                           
                    </div>                                                                                                                                                                    
                  </div>                                                                                                                                                                      
                </div>                                                                                                                                                                        
                                                                                                                                                                                              
                <button                                                                                                                                                                       
                  onClick={handleConfirm}                                                                                                                                                     
                  className="btn btn-primary btn-block btn-lg"                                                                                                                                
                  style={{ marginTop: 'var(--space-4)' }}                                                                                                                                     
                  disabled={isProcessing}                                                                                                                                                     
                >                                                                                                                                                                             
                  {isProcessing ? (                                                                                                                                                           
                    <>                                                                                                                                                                        
                      <span className="spinner-inline"></span>                                                                                                                                
                      {paymentChoice === 'stripe'                                                                                                                                             
                        ? 'Redirecting to Stripe…'                                                                                                                                            
                        : 'Confirming…'}                                                                                                                                                      
                    </>                                                                                                                                                                       
                  ) : (                                                                                                                                                                       
                    <>                                                                                                                                                                        
                      <i className="fa fa-lock me-2"></i>                                                                                                                                     
                      {paymentChoice === 'stripe'                                                                                                                                             
                        ? `Pay ${formatRupees(finalAmount)} via Stripe`                                                                                                                       
                        : `Confirm booking · Pay ${formatRupees(advanceAmount)}`}                                                                                                             
                    </>                                                                                                                                                                       
                  )}                                                                                                                                                                          
                </button>                                                                                                                                                                     
                                                                                                                                                                                              
                <p                                                                                                                                                                            
                  style={{                                                                                                                                                                    
                    textAlign: 'center',                                                                                                                                                      
                    fontSize: '0.75rem',                                                                                                                                                      
                    color: 'var(--color-text-muted)',                                                                                                                                         
                    marginTop: 'var(--space-3)',                                                                                                                                              
                    marginBottom: 0,                                                                                                                                                          
                  }}                                                                                                                                                                          
                >                                                                                                                                                                             
                  <i className="fa fa-shield-halved me-1"></i>                                                                                                                                
                  Your payment is secured with 256-bit encryption                                                                                                                             
                </p>                                                                                                                                                                          
              </div>                                                                                                                                                                          
            </aside>                                                                                                                                                                          
          </div>                                                                                                                                                                              
        </div>                                                                                                                                                                                
      </main>                                                                                                                                                                                 
    )                                                                                                                                                                                         
  }                                                                                                                                                                                           
                                                                                                                                                                                              
  export default Checkout   