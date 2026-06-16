  import { useEffect, useState } from 'react'                                                                                                                                                 
  import { useLocation } from 'react-router-dom'                                                                                                                                              
  import AllRoutes from './routes/AllRoutes'                                                                                                                                                  
  import Slidder from './components/Slidder'                                                                                                                                                  
  import Header from './components/Header'                                                                                                                                                    
  import Footer from './components/Footer'                                                                                                                                                    
  import CopyRight from './components/CopyRight'                                                                                                                                              
                                                                                                                                                                                              
  const App = () => {                                                                                                                                                                         
    const location = useLocation()                                                                                                                                                            
    const isHome = location.pathname === '/'                                                                                                                                                  
    const [scrolled, setScrolled] = useState(false)                                                                                                                                           
                                                                                                                                                                                              
    // Add shadow to header on scroll                                                                                                                                                         
    useEffect(() => {                                                                                                                                                                         
      const onScroll = () => setScrolled(window.scrollY > 10)                                                                                                                                 
      window.addEventListener('scroll', onScroll, { passive: true })                                                                                                                          
      return () => window.removeEventListener('scroll', onScroll)                                                                                                                             
    }, [])                                                                                                                                                                                    
                                                                                                                                                                                              
    // Scroll to top on route change (cleaner UX than the old scrollTo 765 hack)                                                                                                              
    useEffect(() => {                                                                                                                                                                         
      window.scrollTo({ top: 0, behavior: 'instant' })                                                                                                                                        
    }, [location.pathname])                                                                                                                                                                   
                                                                                                                                                                                              
    return (                                                                                                                                                                                  
      <>                                                                                                                                                                                      
        <Header scrolled={scrolled} />                                                                                                                                                        
        {isHome && <Slidder />}                                                                                                                                                               
        <main style={{ minHeight: '60vh' }}>                                                                                                                                                  
          <AllRoutes />                                                                                                                                                                       
        </main>                                                                                                                                                                               
        <Footer />                                                                                                                                                                            
        <CopyRight />                                                                                                                                                                         
                                                                                                                                                                                              
        {/* Back to top */}                                                                                                                                                                   
        <a                                                                                                                                                                                    
          href="#"                                                                                                                                                                            
          className="btn btn-primary rounded-circle back-to-top"                                                                                                                              
          style={{                                                                                                                                                                            
            position: 'fixed',                                                                                                                                                                
            bottom: '24px',                                                                                                                                                                   
            right: '24px',                                                                                                                                                                    
            width: '48px',                                                                                                                                                                    
            height: '48px',                                                                                                                                                                   
            display: 'flex',                                                                                                                                                                  
            alignItems: 'center',                                                                                                                                                             
            justifyContent: 'center',                                                                                                                                                         
            boxShadow: 'var(--shadow-md)',                                                                                                                                                    
            zIndex: 1000,                                                                                                                                                                     
          }}                                                                                                                                                                                  
          aria-label="Back to top"                                                                                                                                                            
        >                                                                                                                                                                                     
          <i className="fa fa-arrow-up"></i>                                                                                                                                                  
        </a>                                                                                                                                                                                  
      </>                                                                                                                                                                                     
    )                                                                                                                                                                                         
  }                                                                                                                                                                                           
                                                                                                                                                                                              
  export default App  