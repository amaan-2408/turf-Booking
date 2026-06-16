 import { useState } from 'react'                                                                                                                                                            
  import { NavLink, useNavigate, Link } from 'react-router-dom'                                                                                                                               
  import { useFormik } from 'formik'                                                                                                                                                          
  import axios from 'axios'                                                                                                                                                                   
  import BusinessLoginSchema from '../../schema/BusinessLoginSchema'                                                                                                                          
                                                                                                                                                                                              
  const BusinessLogin = () => {                                                                                                                                                               
    const navigate = useNavigate()                                                                                                                                                            
    const [errMsg, setErrMsg] = useState('')                                                                                                                                                  
    const [isLoading, setIsLoading] = useState(false)                                                                                                                                         
    const [showPassword, setShowPassword] = useState(false)                                                                                                                                   
                                                                                                                                                                                              
    const BusinessLoginFrm = useFormik({                                                                                                                                                      
      validationSchema: BusinessLoginSchema,                                                                                                                                                  
      initialValues: {                                                                                                                                                                        
        email: '',                                                                                                                                                                            
        password: '',                                                                                                                                                                         
      },                                                                                                                                                                                      
      onSubmit: (FormData) => {                                                                                                                                                               
        setErrMsg('')                                                                                                                                                                         
        setIsLoading(true)                                                                                                                                                                    
                                                                                                                                                                                              
        axios                                                                                                                                                                                 
          .post('http://localhost:3000/api/v1/business/auth', FormData)                                                                                                                       
          .then((response) => {                                                                                                                                                               
            if (response.data.success === false) {                                                                                                                                            
              // Both errType 1 (no email) and errType 2 (wrong password) get                                                                                                                 
              // the same message — prevents email enumeration.                                                                                                                               
              setErrMsg('Email or password is incorrect')                                                                                                                                     
              setIsLoading(false)                                                                                                                                                             
              return                                                                                                                                                                          
            }                                                                                                                                                                                 
                                                                                                                                                                                              
            localStorage.setItem('business_access', response.data.token)                                                                                                                      
            localStorage.setItem('business_name', response.data.name)                                                                                                                         
            navigate('/business/myaccount')                                                                                                                                                   
          })                                                                                                                                                                                  
          .catch(() => {                                                                                                                                                                      
            setErrMsg('Could not reach the server. Please try again.')                                                                                                                        
            setIsLoading(false)                                                                                                                                                               
          })                                                                                                                                                                                  
      },                                                                                                                                                                                      
    })                                                                                                                                                                                        
                                                                                                                                                                                              
    return (                                                                                                                                                                                  
      <main className="auth-page">                                                                                                                                                            
        <div className="auth-card">                                                                                                                                                           
          <Link to="/" className="auth-brand">                                                                                                                                                
            <i className="fa fa-futbol"></i>                                                                                                                                                  
            <span>Game On Turf</span>                                                                                                                                                         
          </Link>                                                                                                                                                                             
                                                                                                                                                                                              
          <h1>Business sign in</h1>                                                                                                                                                           
          <p className="auth-subtitle">Manage your turfs and bookings</p>                                                                                                                     
                                                                                                                                                                                              
          {errMsg && (                                                                                                                                                                        
            <div className="alert-error" role="alert">                                                                                                                                        
              <i className="fa fa-exclamation-circle"></i>                                                                                                                                    
              <span>{errMsg}</span>                                                                                                                                                           
            </div>                                                                                                                                                                            
          )}                                                                                                                                                                                  
                                                                                                                                                                                              
          <form                                                                                                                                                                               
            onSubmit={BusinessLoginFrm.handleSubmit}                                                                                                                                          
            className="auth-form"                                                                                                                                                             
            noValidate                                                                                                                                                                        
          >                                                                                                                                                                                   
            <div className="form-group">                                                                                                                                                      
              <label htmlFor="email" className="form-label">                                                                                                                                  
                Business email                                                                                                                                                                
              </label>                                                                                                                                                                        
              <input                                                                                                                                                                          
                id="email"                                                                                                                                                                    
                type="email"                                                                                                                                                                  
                name="email"                                                                                                                                                                  
                autoComplete="email"                                                                                                                                                          
                placeholder="you@business.com"                                                                                                                                                
                value={BusinessLoginFrm.values.email}                                                                                                                                         
                onChange={BusinessLoginFrm.handleChange}                                                                                                                                      
                onBlur={BusinessLoginFrm.handleBlur}                                                                                                                                          
                className={`form-control ${                                                                                                                                                   
                  BusinessLoginFrm.errors.email && BusinessLoginFrm.touched.email                                                                                                             
                    ? 'is-invalid'                                                                                                                                                            
                    : ''                                                                                                                                                                      
                }`}                                                                                                                                                                           
              />                                                                                                                                                                              
              {BusinessLoginFrm.errors.email && BusinessLoginFrm.touched.email && (                                                                                                           
                <small className="text-danger">                                                                                                                                               
                  {BusinessLoginFrm.errors.email}                                                                                                                                             
                </small>                                                                                                                                                                      
              )}                                                                                                                                                                              
            </div>                                                                                                                                                                            
                                                                                                                                                                                              
            <div className="form-group">                                                                                                                                                      
              <label htmlFor="password" className="form-label">                                                                                                                               
                Password                                                                                                                                                                      
              </label>                                                                                                                                                                        
              <div className="password-input">                                                                                                                                                
                <input                                                                                                                                                                        
                  id="password"                                                                                                                                                               
                  type={showPassword ? 'text' : 'password'}                                                                                                                                   
                  name="password"                                                                                                                                                             
                  autoComplete="current-password"                                                                                                                                             
                  placeholder="Enter your password"                                                                                                                                           
                  value={BusinessLoginFrm.values.password}                                                                                                                                    
                  onChange={BusinessLoginFrm.handleChange}                                                                                                                                    
                  onBlur={BusinessLoginFrm.handleBlur}                                                                                                                                        
                  className={`form-control ${                                                                                                                                                 
                    BusinessLoginFrm.errors.password && BusinessLoginFrm.touched.password                                                                                                     
                      ? 'is-invalid'                                                                                                                                                          
                      : ''                                                                                                                                                                    
                  }`}                                                                                                                                                                         
                />                                                                                                                                                                            
                <button                                                                                                                                                                       
                  type="button"                                                                                                                                                               
                  className="password-toggle"                                                                                                                                                 
                  onClick={() => setShowPassword((s) => !s)}                                                                                                                                  
                  aria-label={showPassword ? 'Hide password' : 'Show password'}                                                                                                               
                  tabIndex={-1}                                                                                                                                                               
                >                                                                                                                                                                             
                  <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>                                                                                                        
                </button>                                                                                                                                                                     
              </div>                                                                                                                                                                          
              {BusinessLoginFrm.errors.password && BusinessLoginFrm.touched.password && (                                                                                                     
                <small className="text-danger">                                                                                                                                               
                  {BusinessLoginFrm.errors.password}                                                                                                                                          
                </small>                                                                                                                                                                      
              )}                                                                                                                                                                              
            </div>                                                                                                                                                                            
                                                                                                                                                                                              
            <div className="form-row">                                                                                                                                                        
              <label>                                                                                                                                                                         
                <input type="checkbox" name="remember" /> Remember me                                                                                                                         
              </label>                                                                                                                                                                        
              <NavLink to="/">Forgot password?</NavLink>                                                                                                                                      
            </div>                                                                                                                                                                            
                                                                                                                                                                                              
            <button                                                                                                                                                                           
              type="submit"                                                                                                                                                                   
              className="btn btn-primary btn-block"                                                                                                                                           
              disabled={isLoading}                                                                                                                                                            
            >                                                                                                                                                                                 
              {isLoading ? (                                                                                                                                                                  
                <>                                                                                                                                                                            
                  <span className="spinner-inline"></span>                                                                                                                                    
                  Signing in...                                                                                                                                                               
                </>                                                                                                                                                                           
              ) : (                                                                                                                                                                           
                'Sign in'                                                                                                                                                                     
              )}                                                                                                                                                                              
            </button>                                                                                                                                                                         
                                                                                                                                                                                              
            <p className="auth-footer">                                                                                                                                                       
              New business?{' '}                                                                                                                                                              
              <NavLink to="/business/register">Register your turf business</NavLink>                                                                                                          
            </p>                                                                                                                                                                              
          </form>                                                                                                                                                                             
        </div>                                                                                                                                                                                
      </main>                                                                                                                                                                                 
    )                                                                                                                                                                                         
  }                                                                                                                                                                                           
                                                                                                                                                                                              
  export default BusinessLogin  