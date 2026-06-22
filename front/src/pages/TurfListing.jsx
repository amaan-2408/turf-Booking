 import { useEffect, useMemo, useState } from 'react'                                                                                                                                        
  import { Link } from 'react-router-dom'                                                                                                                                                     
  import axios from 'axios'                                                                                                                                                                   
  import { API_URL } from '../config/Api'                                                                                                                                                     
                                                                                                                                                                                              
  const formatPrice = (n) =>                                                                                                                                                                  
    typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : '—'                                                                                                                             
                                                                                                                                                                                              
  const TurfsListing = () => {                                                                                                                                                                
    const [turfs, setTurfs] = useState([])                                                                                                                                                    
    const [isLoading, setIsLoading] = useState(true)                                                                                                                                          
    const [error, setError] = useState(null)                                                                                                                                                  
    const [query, setQuery] = useState('')                                                                                                                                                    
    const [maxPrice, setMaxPrice] = useState(5000)                                                                                                                                            
                                                                                                                                                                                              
    useEffect(() => {                                                                                                                                                                         
      axios                                                                                                                                                                                   
        .get(`${API_URL}/turfs`)                                                                                                                                                              
        .then((response) => {                                                                                                                                                                 
          setTurfs(response.data || [])                                                                                                                                                       
          setIsLoading(false)                                                                                                                                                                 
        })                                                                                                                                                                                    
        .catch(() => {                                                                                                                                                                        
          setError('Could not load turfs. Is the backend running?')                                                                                                                           
          setIsLoading(false)                                                                                                                                                                 
        })                                                                                                                                                                                    
    }, [])                                                                                                                                                                                    
                                                                                                                                                                                              
    // Derive price ceiling from real data so the slider makes sense                                                                                                                          
    const priceCeiling = useMemo(() => {                                                                                                                                                      
      if (!turfs.length) return 5000                                                                                                                                                          
      const max = Math.max(...turfs.map((t) => t.price || 0))                                                                                                                                 
      return Math.ceil((max || 1000) / 100) * 100                                                                                                                                             
    }, [turfs])                                                                                                                                                                               
                                                                                                                                                                                              
    // Apply search + price filter                                                                                                                                                            
    const visible = useMemo(() => {                                                                                                                                                           
      const q = query.trim().toLowerCase()                                                                                                                                                    
      return turfs.filter((t) => {                                                                                                                                                            
        const matchesQuery =                                                                                                                                                                  
          !q ||                                                                                                                                                                               
          (t.name || '').toLowerCase().includes(q) ||                                                                                                                                         
          (t.address || '').toLowerCase().includes(q)                                                                                                                                         
        const matchesPrice = !t.price || t.price <= maxPrice                                                                                                                                  
        return matchesQuery && matchesPrice                                                                                                                                                   
      })                                                                                                                                                                                      
    }, [turfs, query, maxPrice])                                                                                                                                                              
                                                                                                                                                                                              
    return (                                                                                                                                                                                  
      <main className="dashboard-page">                                                                                                                                                       
        <div className="container">                                                                                                                                                           
          {/* Header */}                                                                                                                                                                      
          <div className="dashboard-header">                                                                                                                                                  
            <div>                                                                                                                                                                             
              <h1>Browse turfs</h1>                                                                                                                                                           
              <p>                                                                                                                                                                             
                {isLoading                                                                                                                                                                    
                  ? 'Loading available turfs…'                                                                                                                                                
                  : `${visible.length} ${visible.length === 1 ? 'turf' : 'turfs'} available`}                                                                                                 
              </p>                                                                                                                                                                            
            </div>                                                                                                                                                                            
            <Link to="/" className="btn btn-outline-secondary">                                                                                                                               
              <i className="fa fa-arrow-left me-2"></i>Back to home                                                                                                                           
            </Link>                                                                                                                                                                           
          </div>                                                                                                                                                                              
                                                                                                                                                                                              
          {/* Filters */}                                                                                                                                                                     
          <div className="dashboard-panel" style={{ marginBottom: 'var(--space-5)' }}>                                                                                                        
            <div className="row g-3 align-items-end">                                                                                                                                         
              <div className="col-md-7">                                                                                                                                                      
                <label className="booking-section-label" htmlFor="turf-search">                                                                                                               
                  Search by name or area                                                                                                                                                      
                </label>                                                                                                                                                                      
                <input                                                                                                                                                                        
                  id="turf-search"                                                                                                                                                            
                  type="search"                                                                                                                                                               
                  className="form-control"                                                                                                                                                    
                  placeholder="e.g. Sharma Turf, Indore, Football…"                                                                                                                           
                  value={query}                                                                                                                                                               
                  onChange={(e) => setQuery(e.target.value)}                                                                                                                                  
                />                                                                                                                                                                            
              </div>                                                                                                                                                                          
              <div className="col-md-5">                                                                                                                                                      
                <label className="booking-section-label" htmlFor="turf-price">                                                                                                                
                  Max price: <strong>{formatPrice(maxPrice)}/hr</strong>                                                                                                                      
                </label>                                                                                                                                                                      
                <input                                                                                                                                                                        
                  id="turf-price"                                                                                                                                                             
                  type="range"                                                                                                                                                                
                  className="form-range"                                                                                                                                                      
                  min="100"                                                                                                                                                                   
                  max={priceCeiling}                                                                                                                                                          
                  step="50"                                                                                                                                                                   
                  value={maxPrice}                                                                                                                                                            
                  onChange={(e) => setMaxPrice(Number(e.target.value))}                                                                                                                       
                />                                                                                                                                                                            
              </div>                                                                                                                                                                          
            </div>                                                                                                                                                                            
          </div>                                                                                                                                                                              
                                                                                                                                                                                              
          {/* States */}                                                                                                                                                                      
          {isLoading ? (                                                                                                                                                                      
            <div className="row g-4">                                                                                                                                                         
              {[1, 2, 3, 4, 5, 6].map((i) => (                                                                                                                                                
                <div key={i} className="col-lg-4 col-md-6">                                                                                                                                   
                  <div className="card h-100">                                                                                                                                                
                    <div                                                                                                                                                                      
                      className="skeleton"                                                                                                                                                    
                      style={{ height: 220, borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }}                                                                                          
                    ></div>                                                                                                                                                                   
                    <div className="card-body">                                                                                                                                               
                      <div className="skeleton skeleton-box w-60 mb-3"></div>                                                                                                                 
                      <div className="skeleton skeleton-box w-80 mb-2"></div>                                                                                                                 
                      <div className="skeleton skeleton-box w-40"></div>                                                                                                                      
                    </div>                                                                                                                                                                    
                  </div>                                                                                                                                                                      
                </div>                                                                                                                                                                        
              ))}                                                                                                                                                                             
            </div>                                                                                                                                                                            
          ) : error ? (                                                                                                                                                                       
            <div className="empty-state">                                                                                                                                                     
              <div className="empty-state-icon">                                                                                                                                              
                <i className="fa fa-exclamation-triangle"></i>                                                                                                                                
              </div>                                                                                                                                                                          
              <h3>Couldn't load turfs</h3>                                                                                                                                                    
              <p>{error}</p>                                                                                                                                                                  
              <button onClick={() => window.location.reload()} className="btn btn-primary">                                                                                                   
                Try again                                                                                                                                                                     
              </button>                                                                                                                                                                       
            </div>                                                                                                                                                                            
          ) : turfs.length === 0 ? (                                                                                                                                                          
            <div className="empty-state">                                                                                                                                                     
              <div className="empty-state-icon">                                                                                                                                              
                <i className="fa fa-futbol"></i>                                                                                                                                              
              </div>                                                                                                                                                                          
              <h3>No turfs yet</h3>                                                                                                                                                           
              <p>                                                                                                                                                                             
                Be the first to list your turf. Once businesses add turfs, they'll                                                                                                            
                show up here for booking.                                                                                                                                                     
              </p>                                                                                                                                                                            
              <Link to="/business/register" className="btn btn-primary">                                                                                                                      
                List your turf                                                                                                                                                                
              </Link>                                                                                                                                                                         
            </div>                                                                                                                                                                            
          ) : visible.length === 0 ? (                                                                                                                                                        
            <div className="empty-state">                                                                                                                                                     
              <div className="empty-state-icon">                                                                                                                                              
                <i className="fa fa-search"></i>                                                                                                                                              
              </div>                                                                                                                                                                          
              <h3>No matches</h3>                                                                                                                                                             
              <p>                                                                                                                                                                             
                No turfs match your search or price filter. Try widening the price                                                                                                            
                range or clearing the search.                                                                                                                                                 
              </p>                                                                                                                                                                            
              <button                                                                                                                                                                         
                onClick={() => {                                                                                                                                                              
                  setQuery('')                                                                                                                                                                
                  setMaxPrice(priceCeiling)                                                                                                                                                   
                }}                                                                                                                                                                            
                className="btn btn-outline-secondary"                                                                                                                                         
              >                                                                                                                                                                               
                Clear filters                                                                                                                                                                 
              </button>                                                                                                                                                                       
            </div>                                                                                                                                                                            
          ) : (                                                                                                                                                                               
            <div className="row g-4">                                                                                                                                                         
              {visible.map((turf) => (                                                                                                                                                        
                <div key={turf._id} className="col-lg-4 col-md-6">                                                                                                                            
                  <TurfCard turf={turf} />                                                                                                                                                    
                </div>                                                                                                                                                                        
              ))}                                                                                                                                                                             
            </div>                                                                                                                                                                            
          )}                                                                                                                                                                                  
        </div>                                                                                                                                                                                
      </main>                                                                                                                                                                                 
    )                                                                                                                                                                                         
  }                                                                                                                                                                                           
                                                                                                                                                                                              
  const TurfCard = ({ turf }) => {                                                                                                                                                            
    const imageUrl = turf.image                                                                                                                                                               
      ? `http://localhost:3000/turf_images/${turf.image}`                                                                                                                                     
      : null                                                                                                                                                                                  
                                                                                                                                                                                              
    return (                                                                                                                                                                                  
      <article className="card h-100" style={{ overflow: 'hidden' }}>                                                                                                                         
        {/* Image */}                                                                                                                                                                         
        <div                                                                                                                                                                                  
          style={{                                                                                                                                                                            
            height: 220,                                                                                                                                                                      
            background: 'var(--color-surface)',                                                                                                                                               
            position: 'relative',                                                                                                                                                             
            overflow: 'hidden',                                                                                                                                                               
          }}                                                                                                                                                                                  
        >                                                                                                                                                                                     
          {imageUrl ? (                                                                                                                                                                       
            <img                                                                                                                                                                              
              src={imageUrl}                                                                                                                                                                  
              alt={turf.name}                                                                                                                                                                 
              loading="lazy"                                                                                                                                                                  
              style={{                                                                                                                                                                        
                width: '100%',                                                                                                                                                                
                height: '100%',                                                                                                                                                               
                objectFit: 'cover',                                                                                                                                                           
                display: 'block',                                                                                                                                                             
              }}                                                                                                                                                                              
            />                                                                                                                                                                                
          ) : (                                                                                                                                                                               
            <div                                                                                                                                                                              
              style={{                                                                                                                                                                        
                width: '100%',                                                                                                                                                                
                height: '100%',                                                                                                                                                               
                display: 'flex',                                                                                                                                                              
                alignItems: 'center',                                                                                                                                                         
                justifyContent: 'center',                                                                                                                                                     
                background:                                                                                                                                                                   
                  'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)',                                                                                        
                color: 'var(--color-text-inverse)',                                                                                                                                           
                fontSize: '2.5rem',                                                                                                                                                           
              }}                                                                                                                                                                              
            >                                                                                                                                                                                 
              <i className="fa fa-futbol"></i>                                                                                                                                                
            </div>                                                                                                                                                                            
          )}                                                                                                                                                                                  
                                                                                                                                                                                              
          {/* Price badge */}                                                                                                                                                                 
          {turf.price ? (                                                                                                                                                                     
            <span                                                                                                                                                                             
              style={{                                                                                                                                                                        
                position: 'absolute',                                                                                                                                                         
                top: 12,                                                                                                                                                                      
                left: 12,                                                                                                                                                                     
                background: 'rgba(15, 23, 42, 0.85)',                                                                                                                                         
                color: 'var(--color-text-inverse)',                                                                                                                                           
                padding: '0.375rem 0.75rem',                                                                                                                                                  
                borderRadius: 'var(--radius-full)',                                                                                                                                           
                fontSize: '0.8125rem',                                                                                                                                                        
                fontWeight: 600,                                                                                                                                                              
                backdropFilter: 'blur(8px)',                                                                                                                                                  
              }}                                                                                                                                                                              
            >                                                                                                                                                                                 
              <i className="fa fa-indian-rupee-sign me-1"></i>                                                                                                                                
              {turf.price}/hr                                                                                                                                                                 
            </span>                                                                                                                                                                           
          ) : null}                                                                                                                                                                           
                                                                                                                                                                                              
          {/* Hours badge */}                                                                                                                                                                 
          {turf.time_open && turf.time_close ? (                                                                                                                                              
            <span                                                                                                                                                                             
              style={{                                                                                                                                                                        
                position: 'absolute',                                                                                                                                                         
                top: 12,                                                                                                                                                                      
                right: 12,                                                                                                                                                                    
                background: 'rgba(255, 255, 255, 0.95)',                                                                                                                                      
                color: 'var(--color-text)',                                                                                                                                                   
                padding: '0.25rem 0.625rem',                                                                                                                                                  
                borderRadius: 'var(--radius-full)',                                                                                                                                           
                fontSize: '0.75rem',                                                                                                                                                          
                fontWeight: 600,                                                                                                                                                              
                boxShadow: 'var(--shadow-xs)',                                                                                                                                                
              }}                                                                                                                                                                              
            >                                                                                                                                                                                 
              <i className="fa fa-clock me-1"></i>                                                                                                                                            
              {turf.time_open} – {turf.time_close}                                                                                                                                            
            </span>                                                                                                                                                                           
          ) : null}                                                                                                                                                                           
        </div>                                                                                                                                                                                
                                                                                                                                                                                              
        {/* Body */}                                                                                                                                                                          
        <div className="card-body d-flex flex-column">                                                                                                                                        
          <h3                                                                                                                                                                                 
            style={{                                                                                                                                                                          
              fontSize: '1.125rem',                                                                                                                                                           
              fontWeight: 700,                                                                                                                                                                
              margin: '0 0 0.5rem',                                                                                                                                                           
              letterSpacing: '-0.01em',                                                                                                                                                       
            }}                                                                                                                                                                                
          >                                                                                                                                                                                   
            {turf.name || 'Untitled turf'}                                                                                                                                                    
          </h3>                                                                                                                                                                               
                                                                                                                                                                                              
          {turf.address && (                                                                                                                                                                  
            <p                                                                                                                                                                                
              style={{                                                                                                                                                                        
                color: 'var(--color-text-muted)',                                                                                                                                             
                fontSize: '0.875rem',                                                                                                                                                         
                margin: '0 0 1rem',                                                                                                                                                           
                display: 'flex',                                                                                                                                                              
                alignItems: 'flex-start',                                                                                                                                                     
                gap: '0.375rem',                                                                                                                                                              
              }}                                                                                                                                                                              
            >                                                                                                                                                                                 
              <i                                                                                                                                                                              
                className="fa fa-location-dot"                                                                                                                                                
                style={{ color: 'var(--color-primary)', marginTop: 3 }}                                                                                                                       
              ></i>                                                                                                                                                                           
              <span>{turf.address}</span>                                                                                                                                                     
            </p>                                                                                                                                                                              
          )}                                                                                                                                                                                  
                                                                                                                                                                                              
          <Link                                                                                                                                                                               
            to={`/turfs/${turf._id}`}                                                                                                                                                         
            className="btn btn-primary mt-auto"                                                                                                                                               
          >                                                                                                                                                                                   
            <i className="fa fa-calendar-plus me-2"></i>                                                                                                                                      
            Book now                                                                                                                                                                          
          </Link>                                                                                                                                                                             
        </div>                                                                                                                                                                                
      </article>                                                                                                                                                                              
    )                                                                                                                                                                                         
  }                                                                                                                                                                                           
                                                                                                                                                                                              
  export default TurfsListing    