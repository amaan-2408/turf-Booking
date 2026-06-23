 import { Link } from 'react-router-dom'                                                                                                                                                     
                                                                                                                                                                                              
  const About = () => {                                                                                                                                                                       
    return (                                                                                                                                                                                  
      <>                                                                                                                                                                                      
        {/* ===== Hero Section ===== */}                                                                                                                                                      
        <section                                                                                                                                                                              
          className="section"                                                                                                                                                                 
          style={{                                                                                                                                                                            
            background:                                                                                                                                                                       
              'linear-gradient(180deg, var(--color-primary-light) 0%, var(--color-bg) 100%)',                                                                                                 
            paddingTop: 'var(--space-9)',                                                                                                                                                     
            paddingBottom: 'var(--space-9)',                                                                                                                                                  
          }}                                                                                                                                                                                  
        >                                                                                                                                                                                     
          <div className="container">                                                                                                                                                         
            <div                                                                                                                                                                              
              style={{                                                                                                                                                                        
                maxWidth: '780px',                                                                                                                                                            
                margin: '0 auto',                                                                                                                                                             
                textAlign: 'center',                                                                                                                                                          
              }}                                                                                                                                                                              
            >                                                                                                                                                                                 
              <span className="eyebrow">About us</span>                                                                                                                                       
              <h1                                                                                                                                                                             
                style={{                                                                                                                                                                      
                  fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',                                                                                                                                    
                  fontWeight: 800,                                                                                                                                                            
                  letterSpacing: '-0.03em',                                                                                                                                                   
                  margin: '0 0 var(--space-4)',                                                                                                                                               
                  lineHeight: 1.05,                                                                                                                                                           
                }}                                                                                                                                                                            
              >                                                                                                                                                                               
                Making sports easier to play, one booking at a time.                                                                                                                          
              </h1>                                                                                                                                                                           
              <p                                                                                                                                                                              
                style={{                                                                                                                                                                      
                  fontSize: '1.125rem',                                                                                                                                                       
                  color: 'var(--color-text-muted)',                                                                                                                                           
                  lineHeight: 1.6,                                                                                                                                                            
                  margin: 0,                                                                                                                                                                  
                }}                                                                                                                                                                            
              >                                                                                                                                                                               
                Game On Turf connects players with premium sports facilities across                                                                                                           
                the city. Book a slot in seconds, show up, play. No phone calls, no                                                                                                           
                waiting, no surprises.                                                                                                                                                        
              </p>                                                                                                                                                                            
            </div>                                                                                                                                                                            
          </div>                                                                                                                                                                              
        </section>                                                                                                                                                                            
                                                                                                                                                                                              
        {/* ===== Mission ===== */}                                                                                                                                                           
        <section className="section-sm">                                                                                                                                                      
          <div className="container">                                                                                                                                                         
            <div                                                                                                                                                                              
              style={{                                                                                                                                                                        
                maxWidth: '720px',                                                                                                                                                            
                margin: '0 auto',                                                                                                                                                             
                textAlign: 'center',                                                                                                                                                          
              }}                                                                                                                                                                              
            >                                                                                                                                                                                 
              <span className="eyebrow">Our mission</span>                                                                                                                                    
              <h2                                                                                                                                                                             
                style={{                                                                                                                                                                      
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',                                                                                                                                  
                  fontWeight: 800,                                                                                                                                                            
                  margin: '0 0 var(--space-4)',                                                                                                                                               
                  letterSpacing: '-0.02em',                                                                                                                                                   
                }}                                                                                                                                                                            
              >                                                                                                                                                                               
                Turfs shouldn't be hard to find                                                                                                                                               
              </h2>                                                                                                                                                                           
              <p                                                                                                                                                                              
                style={{                                                                                                                                                                      
                  fontSize: '1.0625rem',                                                                                                                                                      
                  color: 'var(--color-text)',                                                                                                                                                 
                  lineHeight: 1.7,                                                                                                                                                            
                  margin: 0,                                                                                                                                                                  
                }}                                                                                                                                                                            
              >                                                                                                                                                                               
                We built Game On Turf because finding and booking a turf shouldn't                                                                                                            
                require phone calls, WhatsApp messages, or guesswork. Whether you're                                                                                                          
                organising a weekend cricket match, a weekday football pickup game,                                                                                                           
                or a corporate tournament — the right facility is a few clicks away.                                                                                                          
                For facility owners, we're a 24/7 booking desk that never sleeps.                                                                                                             
              </p>                                                                                                                                                                            
            </div>                                                                                                                                                                            
          </div>                                                                                                                                                                              
        </section>                                                                                                                                                                            
                                                                                                                                                                                              
        {/* ===== How it works ===== */}                                                                                                                                                      
        <section className="section" style={{ background: 'var(--color-surface)' }}>                                                                                                          
          <div className="container">                                                                                                                                                         
            <div className="section-title">                                                                                                                                                   
              <span className="eyebrow">How it works</span>                                                                                                                                   
              <h2>Three steps from couch to court</h2>                                                                                                                                        
            </div>                                                                                                                                                                            
                                                                                                                                                                                              
            <div className="row g-4">                                                                                                                                                         
              {/* Step 1 */}                                                                                                                                                                  
              <div className="col-md-4">                                                                                                                                                      
                <div className="card h-100" style={{ padding: 'var(--space-5)' }}>                                                                                                            
                  <div                                                                                                                                                                        
                    style={{                                                                                                                                                                  
                      display: 'inline-flex',                                                                                                                                                 
                      alignItems: 'center',                                                                                                                                                   
                      justifyContent: 'center',                                                                                                                                               
                      width: 48,                                                                                                                                                              
                      height: 48,                                                                                                                                                             
                      borderRadius: 'var(--radius-md)',                                                                                                                                       
                      background: 'var(--color-primary-light)',                                                                                                                               
                      color: 'var(--color-primary)',                                                                                                                                          
                      fontSize: '1.25rem',                                                                                                                                                    
                      fontWeight: 700,                                                                                                                                                        
                      marginBottom: 'var(--space-4)',                                                                                                                                         
                    }}                                                                                                                                                                        
                  >                                                                                                                                                                           
                    1                                                                                                                                                                         
                  </div>                                                                                                                                                                      
                  <h3                                                                                                                                                                         
                    style={{                                                                                                                                                                  
                      fontSize: '1.25rem',                                                                                                                                                    
                      fontWeight: 700,                                                                                                                                                        
                      margin: '0 0 var(--space-3)',                                                                                                                                           
                    }}                                                                                                                                                                        
                  >                                                                                                                                                                           
                    Browse turfs                                                                                                                                                              
                  </h3>                                                                                                                                                                       
                  <p                                                                                                                                                                          
                    style={{                                                                                                                                                                  
                      color: 'var(--color-text-muted)',                                                                                                                                       
                      margin: 0,                                                                                                                                                              
                      lineHeight: 1.6,                                                                                                                                                        
                    }}                                                                                                                                                                        
                  >                                                                                                                                                                           
                    See all available facilities near you. Filter by sport,                                                                                                                   
                    location, price, and availability — find the perfect turf for                                                                                                             
                    your game.                                                                                                                                                                
                  </p>                                                                                                                                                                        
                </div>                                                                                                                                                                        
              </div>                                                                                                                                                                          
                                                                                                                                                                                              
              {/* Step 2 */}                                                                                                                                                                  
              <div className="col-md-4">                                                                                                                                                      
                <div className="card h-100" style={{ padding: 'var(--space-5)' }}>                                                                                                            
                  <div                                                                                                                                                                        
                    style={{                                                                                                                                                                  
                      display: 'inline-flex',                                                                                                                                                 
                      alignItems: 'center',                                                                                                                                                   
                      justifyContent: 'center',                                                                                                                                               
                      width: 48,                                                                                                                                                              
                      height: 48,                                                                                                                                                             
                      borderRadius: 'var(--radius-md)',                                                                                                                                       
                      background: 'var(--color-primary-light)',                                                                                                                               
                      color: 'var(--color-primary)',                                                                                                                                          
                      fontSize: '1.25rem',                                                                                                                                                    
                      fontWeight: 700,                                                                                                                                                        
                      marginBottom: 'var(--space-4)',                                                                                                                                         
                    }}                                                                                                                                                                        
                  >                                                                                                                                                                           
                    2                                                                                                                                                                         
                  </div>                                                                                                                                                                      
                  <h3                                                                                                                                                                         
                    style={{                                                                                                                                                                  
                      fontSize: '1.25rem',                                                                                                                                                    
                      fontWeight: 700,                                                                                                                                                        
                      margin: '0 0 var(--space-3)',                                                                                                                                           
                    }}                                                                                                                                                                        
                  >                                                                                                                                                                           
                    Book your slot                                                                                                                                                            
                  </h3>                                                                                                                                                                       
                  <p                                                                                                                                                                          
                    style={{                                                                                                                                                                  
                      color: 'var(--color-text-muted)',                                                                                                                                       
                      margin: 0,                                                                                                                                                              
                      lineHeight: 1.6,                                                                                                                                                        
                    }}                                                                                                                                                                        
                  >                                                                                                                                                                           
                    Pick a date, choose a time slot, pay online. Get instant                                                                                                                  
                    confirmation. No phone calls, no waiting. Your slot is locked                                                                                                             
                    the moment you book.                                                                                                                                                      
                  </p>                                                                                                                                                                        
                </div>                                                                                                                                                                        
              </div>                                                                                                                                                                          
                                                                                                                                                                                              
              {/* Step 3 */}                                                                                                                                                                  
              <div className="col-md-4">                                                                                                                                                      
                <div className="card h-100" style={{ padding: 'var(--space-5)' }}>                                                                                                            
                  <div                                                                                                                                                                        
                    style={{                                                                                                                                                                  
                      display: 'inline-flex',                                                                                                                                                 
                      alignItems: 'center',                                                                                                                                                   
                      justifyContent: 'center',                                                                                                                                               
                      width: 48,                                                                                                                                                              
                      height: 48,                                                                                                                                                             
                      borderRadius: 'var(--radius-md)',                                                                                                                                       
                      background: 'var(--color-primary-light)',                                                                                                                               
                      color: 'var(--color-primary)',                                                                                                                                          
                      fontSize: '1.25rem',                                                                                                                                                    
                      fontWeight: 700,                                                                                                                                                        
                      marginBottom: 'var(--space-4)',                                                                                                                                         
                    }}                                                                                                                                                                        
                  >                                                                                                                                                                           
                    3                                                                                                                                                                         
                  </div>                                                                                                                                                                      
                  <h3                                                                                                                                                                         
                    style={{                                                                                                                                                                  
                      fontSize: '1.25rem',                                                                                                                                                    
                      fontWeight: 700,                                                                                                                                                        
                      margin: '0 0 var(--space-3)',                                                                                                                                           
                    }}                                                                                                                                                                        
                  >                                                                                                                                                                           
                    Show up and play                                                                                                                                                          
                  </h3>                                                                                                                                                                       
                  <p                                                                                                                                                                          
                    style={{                                                                                                                                                                  
                      color: 'var(--color-text-muted)',                                                                                                                                       
                      margin: 0,                                                                                                                                                              
                      lineHeight: 1.6,                                                                                                                                                        
                    }}                                                                                                                                                                        
                  >                                                                                                                                                                           
                    That's it. Your booking is on file. Arrive at the facility, play                                                                                                          
                    your game, and walk away happy. No paperwork, no surprises.                                                                                                               
                  </p>                                                                                                                                                                        
                </div>                                                                                                                                                                        
              </div>                                                                                                                                                                          
            </div>                                                                                                                                                                            
          </div>                                                                                                                                                                              
        </section>                                                                                                                                                                            
                                                                                                                                                                                              
        {/* ===== For business owners ===== */}                                                                                                                                               
        <section className="section">                                                                                                                                                         
          <div className="container">                                                                                                                                                         
            <div                                                                                                                                                                              
              className="quick-action"                                                                                                                                                        
              style={{ marginBottom: 0, textAlign: 'center' }}                                                                                                                                
            >                                                                                                                                                                                 
              <h3 style={{ textAlign: 'center' }}>Own a turf? List it on Game On Turf.</h3>                                                                                                   
              <p style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto var(--space-4)' }}>                                                                                         
                Get discovered by players in your area. Accept bookings 24/7. We                                                                                                              
                handle payments, confirmations, and reminders — you handle the                                                                                                                
                game.                                                                                                                                                                         
              </p>                                                                                                                                                                            
              <div className="d-flex justify-content-center gap-2 flex-wrap">                                                                                                                 
                <Link to="/business/register" className="btn btn-light btn-lg">                                                                                                               
                  <i className="fa fa-store me-2"></i>List your turf                                                                                                                          
                </Link>                                                                                                                                                                       
                <Link to="/turfs" className="btn btn-outline-light btn-lg">                                                                                                                   
                  Browse turfs                                                                                                                                                                
                </Link>                                                                                                                                                                       
              </div>                                                                                                                                                                          
            </div>                                                                                                                                                                            
          </div>                                                                                                                                                                              
        </section>                                                                                                                                                                            
                                                                                                                                                                                              
        {/* ===== Contact strip ===== */}                                                                                                                                                     
        <section className="section-sm">                                                                                                                                                      
          <div className="container">                                                                                                                                                         
            <div                                                                                                                                                                              
              style={{                                                                                                                                                                        
                maxWidth: '720px',                                                                                                                                                            
                margin: '0 auto',                                                                                                                                                             
                textAlign: 'center',                                                                                                                                                          
              }}                                                                                                                                                                              
            >                                                                                                                                                                                 
              <h3                                                                                                                                                                             
                style={{                                                                                                                                                                      
                  fontSize: '1.25rem',                                                                                                                                                        
                  fontWeight: 700,                                                                                                                                                            
                  margin: '0 0 var(--space-3)',                                                                                                                                               
                }}                                                                                                                                                                            
              >                                                                                                                                                                               
                Questions? We'd love to hear from you.                                                                                                                                        
              </h3>                                                                                                                                                                           
              <p                                                                                                                                                                              
                style={{                                                                                                                                                                      
                  color: 'var(--color-text-muted)',                                                                                                                                           
                  margin: '0 0 var(--space-3)',                                                                                                                                               
                }}                                                                                                                                                                            
              >                                                                                                                                                                               
                Reach out for partnerships, support, or just to say hi.                                                                                                                       
              </p>                                                                                                                                                                            
              <a                                                                                                                                                                              
                href="mailto:turf@gmail.com"                                                                                                                                                  
                className="btn btn-outline-primary"                                                                                                                                           
              >                                                                                                                                                                               
                <i className="fa fa-envelope me-2"></i>                                                                                                                                       
                turf@gmail.com                                                                                                                                                                
              </a>                                                                                                                                                                            
            </div>                                                                                                                                                                            
          </div>                                                                                                                                                                              
        </section>                                                                                                                                                                            
      </>                                                                                                                                                                                     
    )                                                                                                                                                                                         
  }                                                                                                                                                                                           
                                                                                                                                                                                              
  export default About 