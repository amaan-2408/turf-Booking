import { useEffect, useState } from 'react'                                                                                                                                                 
  import { useParams } from 'react-router-dom'                                                                                                                                                
  import axios from 'axios'                                                                                                                                                                   
  import { API_URL } from '../../config/Api'                                                                                                                                                  
                                                                                                                                                                                              
  const isUpcoming = (date) =>                                                                                                                                                                
    new Date(date) >= new Date(new Date().toDateString())                                                                                                                                     
  const formatDate = (dateStr) =>                                                                                                                                                             
    new Date(dateStr).toLocaleDateString('en-IN', {                                                                                                                                           
      day: 'numeric',                                                                                                                                                                         
      month: 'short',                                                                                                                                                                         
      year: 'numeric',                                                                                                                                                                        
    })                                                                                                                                                                                        
                                                                                                                                                                                              
  const MyTurfBooking = () => {                                                                                                                                                               
    const { id } = useParams()                                                                                                                                                                
    const [bookings, setBookings] = useState([])                                                                                                                                              
    const [isLoading, setIsLoading] = useState(true)                                                                                                                                          
    const [error, setError] = useState(null)                                                                                                                                                  
                                                                                                                                                                                              
    useEffect(() => {                                                                                                                                                                         
      if (!id) {                                                                                                                                                                              
        setError('Missing turf id in the URL.')                                                                                                                                               
        setIsLoading(false)                                                                                                                                                                   
        return                                                                                                                                                                                
      }                                                                                                                                                                                       
      axios                                                                                                                                                                                   
        .get(`${API_URL}/booking/getbyturfid/${id}`)                                                                                                                                          
        .then((response) => {                                                                                                                                                                 
          setBookings(response.data || [])                                                                                                                                                    
          setIsLoading(false)                                                                                                                                                                 
        })                                                                                                                                                                                    
        .catch(() => {                                                                                                                                                                        
          setError('Could not load bookings for this turf.')                                                                                                                                  
          setIsLoading(false)                                                                                                                                                                 
        })                                                                                                                                                                                    
    }, [id])                                                                                                                                                                                  
                                                                                                                                                                                              
    // Turf name from the first booking (if any)                                                                                                                                              
    const turfName = bookings.length > 0 ? bookings[0].turf_id?.name : null                                                                                                                   
                                                                                                                                                                                              
    return (                                                                                                                                                                                  
      <main className="dashboard-page">                                                                                                                                                       
        <div className="container">                                                                                                                                                           
          <div className="dashboard-header">                                                                                                                                                  
            <div>                                                                                                                                                                             
              <h1>{turfName ? `${turfName} · Bookings` : 'Turf bookings'}</h1>                                                                                                                
              <p>All reservations for this turf.</p>                                                                                                                                          
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
                <button onClick={() => window.location.reload()} className="btn btn-primary">                                                                                                 
                  Try again                                                                                                                                                                   
                </button>                                                                                                                                                                     
              </div>                                                                                                                                                                          
            ) : bookings.length === 0 ? (                                                                                                                                                     
              <div className="empty-state">                                                                                                                                                   
                <div className="empty-state-icon">                                                                                                                                            
                  <i className="fa fa-calendar-xmark"></i>                                                                                                                                    
                </div>                                                                                                                                                                        
                <h3>No bookings for this turf yet</h3>                                                                                                                                        
                <p>                                                                                                                                                                           
                  When customers book this turf, their reservations will appear                                                                                                               
                  here.                                                                                                                                                                       
                </p>                                                                                                                                                                          
              </div>                                                                                                                                                                          
            ) : (                                                                                                                                                                             
              <div className="booking-list">                                                                                                                                                  
                {bookings.map((booking, index) => {                                                                                                                                           
                  const status = isUpcoming(booking.date) ? 'upcoming' : 'past'                                                                                                               
                  const imageUrl = booking.turf_id?.image                                                                                                                                     
                    ? `http://localhost:3000/turf_images/${booking.turf_id.image}`                                                                                                            
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
                        <h3>{booking.turf_id?.name || 'Turf booking'}</h3>                                                                                                                    
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
                          {booking.user_id?.contact && (                                                                                                                                      
                            <span>                                                                                                                                                            
                              <i className="fa fa-phone"></i>                                                                                                                                 
                              {booking.user_id.contact}                                                                                                                                       
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
                                                                                                                                                                                              
  export default MyTurfBooking     