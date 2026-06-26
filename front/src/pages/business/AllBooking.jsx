 import { useEffect, useState } from 'react'                                                                                                                                                 
  import axios from 'axios'                                                                                                                                                                   
  import { API_URL, IMAGE_BASE_URL } from '../../config/Api'
                                                                                                                                                                                              
  const isUpcoming = (date) =>                                                                                                                                                                
    new Date(date) >= new Date(new Date().toDateString())                                                                                                                                     
  const formatDate = (dateStr) =>                                                                                                                                                             
    new Date(dateStr).toLocaleDateString('en-IN', {                                                                                                                                           
      day: 'numeric',                                                                                                                                                                         
      month: 'short',                                                                                                                                                                         
      year: 'numeric',                                                                                                                                                                        
    })                                                                                                                                                                                        
                                                                                                                                                                                              
  const AllBooking = () => {                                                                                                                                                                  
    const [allBookings, setAllBookings] = useState([])                                                                                                                                        
    const [isLoading, setIsLoading] = useState(true)                                                                                                                                          
    const [error, setError] = useState(null)                                                                                                                                                  
                                                                                                                                                                                              
    useEffect(() => {                                                                                                                                                                         
      axios                                                                                                                                                                                   
        .get(`${API_URL}/business/mybooking`, {                                                                                                                                               
          headers: { Authorization: localStorage.getItem('business_access') },                                                                                                                
        })                                                                                                                                                                                    
        .then((response) => {                                                                                                                                                                 
          setAllBookings(response.data || [])                                                                                                                                                 
          setIsLoading(false)                                                                                                                                                                 
        })                                                                                                                                                                                    
        .catch(() => {                                                                                                                                                                        
          setError('Could not load bookings. Please try again.')                                                                                                                              
          setIsLoading(false)                                                                                                                                                                 
        })                                                                                                                                                                                    
    }, [])                                                                                                                                                                                    
                                                                                                                                                                                              
    return (                                                                                                                                                                                  
      <main className="dashboard-page">                                                                                                                                                       
        <div className="container">                                                                                                                                                           
          <div className="dashboard-header">                                                                                                                                                  
            <div>                                                                                                                                                                             
              <h1>All bookings</h1>                                                                                                                                                           
              <p>Every reservation across all your turfs.</p>                                                                                                                                 
            </div>                                                                                                                                                                            
          </div>                                                                                                                                                                              
                                                                                                                                                                                              
          <div className="dashboard-panel">                                                                                                                                                   
            {isLoading ? (                                                                                                                                                                    
              <div className="skeleton-list">                                                                                                                                                 
                {[1, 2, 3].map((i) => (                                                                                                                                                       
                  <div key={i} className="skeleton-item">                                                                                                                                     
                    <div className="skeleton skeleton-box w-80"></div>                                                                                                                        
                    <div>                                                                                                                                                                     
                      <div className="skeleton skeleton-box w-60 mb-2"></div>                                                                                                                 
                      <div className="skeleton skeleton-box w-40"></div>                                                                                                                      
                    </div>                                                                                                                                                                    
                    <div                                                                                                                                                                      
                      className="skeleton skeleton-box"                                                                                                                                       
                      style={{ width: 60, height: 24 }}                                                                                                                                       
                    ></div>                                                                                                                                                                   
                  </div>                                                                                                                                                                      
                ))}                                                                                                                                                                           
              </div>                                                                                                                                                                          
            ) : error ? (                                                                                                                                                                     
              <div className="empty-state">                                                                                                                                                   
                <div className="empty-state-icon">                                                                                                                                            
                  <i className="fa fa-exclamation-triangle"></i>                                                                                                                              
                </div>                                                                                                                                                                        
                <h3>Couldn't load bookings</h3>                                                                                                                                               
                <p>{error}</p>                                                                                                                                                                
                <button                                                                                                                                                                       
                  onClick={() => window.location.reload()}                                                                                                                                    
                  className="btn btn-primary"                                                                                                                                                 
                >                                                                                                                                                                             
                  Try again                                                                                                                                                                   
                </button>                                                                                                                                                                     
              </div>                                                                                                                                                                          
            ) : allBookings.length === 0 ? (                                                                                                                                                  
              <div className="empty-state">                                                                                                                                                   
                <div className="empty-state-icon">                                                                                                                                            
                  <i className="fa fa-calendar-xmark"></i>                                                                                                                                    
                </div>                                                                                                                                                                        
                <h3>No bookings yet</h3>                                                                                                                                                      
                <p>                                                                                                                                                                           
                  When customers book your turfs, their reservations will appear                                                                                                              
                  here.                                                                                                                                                                       
                </p>                                                                                                                                                                          
              </div>                                                                                                                                                                          
            ) : (                                                                                                                                                                             
              <div className="booking-list">                                                                                                                                                  
                {allBookings.map((booking, index) => {                                                                                                                                        
                  const status = isUpcoming(booking.date) ? 'upcoming' : 'past'                                                                                                               
                  const imageUrl = booking.turf_id?.image                                                                                                                                     
                    ? `${IMAGE_BASE_URL}/turf_images/${booking.turf_id.image}`   
                    : null                                                                                                                                                                    
                                                                                                                                                                                              
                  return (                                                                                                                                                                    
                    <div key={index} className="booking-item">                                                                                                                                
                      {imageUrl ? (                                                                                                                                                           
                        <div                                                                                                                                                                  
                          className="booking-item-thumb"                                                                                                                                      
                          style={{ backgroundImage: `url(${imageUrl})` }}                                                                                                                     
                          role="img"                                                                                                                                                          
                          aria-label={booking.turf_id?.name}                                                                                                                                  
                        />                                                                                                                                                                    
                      ) : (                                                                                                                                                                   
                        <div className="booking-item-thumb-fallback">                                                                                                                         
                          <i className="fa fa-futbol"></i>                                                                                                                                    
                        </div>                                                                                                                                                                
                      )}                                                                                                                                                                      
                                                                                                                                                                                              
                      <div className="booking-item-body">                                                                                                                                     
                        <h3>{booking.turf_id?.name || 'Unknown turf'}</h3>                                                                                                                    
                        <div className="booking-item-meta">                                                                                                                                   
                          <span>                                                                                                                                                              
                            <i className="fa fa-calendar"></i>                                                                                                                                
                            {formatDate(booking.date)}                                                                                                                                        
                          </span>                                                                                                                                                             
                          {booking.slot && (                                                                                                                                                  
                            <span>                                                                                                                                                            
                              <i className="fa fa-clock"></i>                                                                                                                                 
                              {Array.isArray(booking.slot)                                                                                                                                    
                                ? booking.slot.join(', ')                                                                                                                                     
                                : booking.slot}                                                                                                                                               
                            </span>                                                                                                                                                           
                          )}                                                                                                                                                                  
                          {booking.user_id?.name && (                                                                                                                                         
                            <span>                                                                                                                                                            
                              <i className="fa fa-user"></i>                                                                                                                                  
                              {booking.user_id.name}                                                                                                                                          
                            </span>                                                                                                                                                           
                          )}                                                                                                                                                                  
                          {booking.user_id?.email && (                                                                                                                                        
                            <span>                                                                                                                                                            
                              <i className="fa fa-envelope"></i>                                                                                                                              
                              {booking.user_id.email}                                                                                                                                         
                            </span>                                                                                                                                                           
                          )}                                                                                                                                                                  
                          <span className={`badge-status ${status}`}>                                                                                                                         
                            {status === 'upcoming' ? 'Upcoming' : 'Completed'}                                                                                                                
                          </span>                                                                                                                                                             
                        </div>                                                                                                                                                                
                      </div>                                                                                                                                                                  
                                                                                                                                                                                              
                      <div className="booking-item-amount">                                                                                                                                   
                        <small>Booking</small>₹                                                                                                                                               
                        {(booking.amount || 0).toLocaleString('en-IN')}                                                                                                                       
                      </div>                                                                                                                                                                  
                    </div>                                                                                                                                                                    
                  )                                                                                                                                                                           
                })}                                                                                                                                                                           
              </div>                                                                                                                                                                          
            )}                                                                                                                                                                                
          </div>                                                                                                                                                                              
        </div>                                                                                                                                                                                
      </main>                                                                                                                                                                                 
    )                                                                                                                                                                                         
  }                                                                                                                                                                                           
                                                                                                                                                                                              
  export default AllBooking  