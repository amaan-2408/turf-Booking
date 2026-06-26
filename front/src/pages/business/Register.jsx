import { useState } from 'react'
  import { NavLink, useNavigate, Link } from 'react-router-dom'
  import { useFormik } from 'formik'
  import axios from 'axios'
  import BusinessRegisterSchema from '../../schema/BusinessRegisterSchema'
  import { API_URL } from '../../config/Api';
                                                                                                                                                                                              
  // Returns 'weak' | 'medium' | 'strong' | '' based on password content.                                                                                                                     
  const getPasswordStrength = (password) => {                                                                                                                                                 
    if (!password) return ''                                                                                                                                                                  
    let score = 0                                                                                                                                                                             
    if (password.length >= 8) score++                                                                                                                                                         
    if (/[A-Z]/.test(password)) score++                                                                                                                                                       
    if (/[0-9]/.test(password)) score++                                                                                                                                                       
    if (/[^A-Za-z0-9]/.test(password)) score++                                                                                                                                                
    if (score <= 1) return 'weak'                                                                                                                                                             
    if (score <= 3) return 'medium'                                                                                                                                                           
    return 'strong'                                                                                                                                                                           
  }                                                                                                                                                                                           
                                                                                                                                                                                              
  const Register = () => {                                                                                                                                                                    
    const navigate = useNavigate()                                                                                                                                                            
    const [errMsg, setErrMsg] = useState('')                                                                                                                                                  
    const [isLoading, setIsLoading] = useState(false)                                                                                                                                         
    const [showPassword, setShowPassword] = useState(false)                                                                                                                                   
    const [acceptedTerms, setAcceptedTerms] = useState(false)                                                                                                                                 
                                                                                                                                                                                              
    const BusinessRegisterFrm = useFormik({                                                                                                                                                   
      validationSchema: BusinessRegisterSchema,                                                                                                                                               
      initialValues: {                                                                                                                                                                        
        name: '',                                                                                                                                                                             
        email: '',                                                                                                                                                                            
        contact: '',                                                                                                                                                                          
        password: '',                                                                                                                                                                         
        repassword: '',                                                                                                                                                                       
      },                                                                                                                                                                                      
      onSubmit: (formData) => {                                                                                                                                                               
        setErrMsg('')                                                                                                                                                                         
                                                                                                                                                                                              
        if (!acceptedTerms) {                                                                                                                                                                 
          setErrMsg('Please accept the terms and conditions to continue.')                                                                                                                    
          return                                                                                                                                                                              
        }                                                                                                                                                                                     
                                                                                                                                                                                              
        setIsLoading(true)                                                                                                                                                                    
        axios
          .post(`${API_URL}/business`, formData) 
          .then(() => {                                                                                                                                                                       
            navigate('/business/login', {                                                                                                                                                     
              state: { justRegistered: true },                                                                                                                                                
            })                                                                                                                                                                                
          })                                                                                                                                                                                  
          .catch((err) => {                                                                                                                                                                   
            setErrMsg(                                                                                                                                                                        
              err?.response?.data?.message ||                                                                                                                                                 
                'Could not create your business account. Please try again.'                                                                                                                   
            )                                                                                                                                                                                 
            setIsLoading(false)                                                                                                                                                               
          })                                                                                                                                                                                  
      },                                                                                                                                                                                      
    })                                                                                                                                                                                        
                                                                                                                                                                                              
    const passwordStrength = getPasswordStrength(BusinessRegisterFrm.values.password)                                                                                                         
    const strengthBars = passwordStrength ? 4 : 0                                                                                                                                             
    const strengthLabel = {                                                                                                                                                                   
      weak: 'Weak — add length, numbers, and symbols',                                                                                                                                        
      medium: 'Medium — consider adding a special character',                                                                                                                                 
      strong: 'Strong password',                                                                                                                                                              
    }[passwordStrength]                                                                                                                                                                       
                                                                                                                                                                                              
    return (                                                                                                                                                                                  
      <main className="auth-page">                                                                                                                                                            
        <div className="auth-card" style={{ maxWidth: '480px' }}>                                                                                                                             
          <Link to="/" className="auth-brand">                                                                                                                                                
            <i className="fa fa-futbol"></i>                                                                                                                                                  
            <span>Game On Turf</span>                                                                                                                                                         
          </Link>                                                                                                                                                                             
                                                                                                                                                                                              
          <h1>List your business</h1>                                                                                                                                                         
          <p className="auth-subtitle">Start receiving bookings in minutes</p>                                                                                                                
                                                                                                                                                                                              
          {errMsg && (                                                                                                                                                                        
            <div className="alert-error" role="alert">                                                                                                                                        
              <i className="fa fa-exclamation-circle"></i>                                                                                                                                    
              <span>{errMsg}</span>                                                                                                                                                           
            </div>                                                                                                                                                                            
          )}                                                                                                                                                                                  
                                                                                                                                                                                              
          <form                                                                                                                                                                               
            onSubmit={BusinessRegisterFrm.handleSubmit}                                                                                                                                       
            className="auth-form"                                                                                                                                                             
            noValidate                                                                                                                                                                        
          >                                                                                                                                                                                   
            <div className="form-group">                                                                                                                                                      
              <label htmlFor="name" className="form-label">                                                                                                                                   
                Business name                                                                                                                                                                 
              </label>                                                                                                                                                                        
              <input                                                                                                                                                                          
                id="name"                                                                                                                                                                     
                type="text"                                                                                                                                                                   
                name="name"                                                                                                                                                                   
                autoComplete="organization"                                                                                                                                                   
                placeholder="e.g. FC Turf Club"                                                                                                                                           
                value={BusinessRegisterFrm.values.name}                                                                                                                                       
                onChange={BusinessRegisterFrm.handleChange}                                                                                                                                   
                onBlur={BusinessRegisterFrm.handleBlur}                                                                                                                                       
                className={`form-control ${                                                                                                                                                   
                  BusinessRegisterFrm.errors.name && BusinessRegisterFrm.touched.name                                                                                                         
                    ? 'is-invalid'                                                                                                                                                            
                    : ''                                                                                                                                                                      
                }`}                                                                                                                                                                           
              />                                                                                                                                                                              
              {BusinessRegisterFrm.errors.name && BusinessRegisterFrm.touched.name && (                                                                                                       
                <small className="text-danger">                                                                                                                                               
                  {BusinessRegisterFrm.errors.name}                                                                                                                                           
                </small>                                                                                                                                                                      
              )}                                                                                                                                                                              
            </div>                                                                                                                                                                            
                                                                                                                                                                                              
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
                value={BusinessRegisterFrm.values.email}                                                                                                                                      
                onChange={BusinessRegisterFrm.handleChange}                                                                                                                                   
                onBlur={BusinessRegisterFrm.handleBlur}                                                                                                                                       
                className={`form-control ${                                                                                                                                                   
                  BusinessRegisterFrm.errors.email && BusinessRegisterFrm.touched.email                                                                                                       
                    ? 'is-invalid'                                                                                                                                                            
                    : ''                                                                                                                                                                      
                }`}                                                                                                                                                                           
              />                                                                                                                                                                              
              {BusinessRegisterFrm.errors.email && BusinessRegisterFrm.touched.email && (                                                                                                     
                <small className="text-danger">                                                                                                                                               
                  {BusinessRegisterFrm.errors.email}                                                                                                                                          
                </small>                                                                                                                                                                      
              )}                                                                                                                                                                              
            </div>                                                                                                                                                                            
                                                                                                                                                                                              
            <div className="form-group">                                                                                                                                                      
              <label htmlFor="contact" className="form-label">                                                                                                                                
                Contact number                                                                                                                                                                
              </label>                                                                                                                                                                        
              <input                                                                                                                                                                          
                id="contact"                                                                                                                                                                  
                type="tel"                                                                                                                                                                    
                name="contact"                                                                                                                                                                
                autoComplete="tel"                                                                                                                                                            
                placeholder="10-digit mobile number"                                                                                                                                          
                value={BusinessRegisterFrm.values.contact}                                                                                                                                    
                onChange={BusinessRegisterFrm.handleChange}                                                                                                                                   
                onBlur={BusinessRegisterFrm.handleBlur}                                                                                                                                       
                className={`form-control ${                                                                                                                                                   
                  BusinessRegisterFrm.errors.contact && BusinessRegisterFrm.touched.contact                                                                                                   
                    ? 'is-invalid'                                                                                                                                                            
                    : ''                                                                                                                                                                      
                }`}                                                                                                                                                                           
              />                                                                                                                                                                              
              {BusinessRegisterFrm.errors.contact && BusinessRegisterFrm.touched.contact && (                                                                                                 
                <small className="text-danger">                                                                                                                                               
                  {BusinessRegisterFrm.errors.contact}                                                                                                                                        
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
                  autoComplete="new-password"                                                                                                                                                 
                  placeholder="At least 8 characters"                                                                                                                                         
                  value={BusinessRegisterFrm.values.password}                                                                                                                                 
                  onChange={BusinessRegisterFrm.handleChange}                                                                                                                                 
                  onBlur={BusinessRegisterFrm.handleBlur}                                                                                                                                     
                  className={`form-control ${                                                                                                                                                 
                    BusinessRegisterFrm.errors.password && BusinessRegisterFrm.touched.password                                                                                               
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
              {BusinessRegisterFrm.values.password && (                                                                                                                                       
                <>                                                                                                                                                                            
                  <div className="password-strength" aria-hidden="true">                                                                                                                      
                    {[1, 2, 3, 4].map((i) => (                                                                                                                                                
                      <div                                                                                                                                                                    
                        key={i}                                                                                                                                                               
                        className={`password-strength-bar ${                                                                                                                                  
                          i <= strengthBars ? passwordStrength : ''                                                                                                                           
                        }`}                                                                                                                                                                   
                      />                                                                                                                                                                      
                    ))}                                                                                                                                                                       
                  </div>                                                                                                                                                                      
                  <p className="password-strength-label">{strengthLabel}</p>                                                                                                                  
                </>                                                                                                                                                                           
              )}                                                                                                                                                                              
              {BusinessRegisterFrm.errors.password && BusinessRegisterFrm.touched.password && (                                                                                               
                <small className="text-danger">                                                                                                                                               
                  {BusinessRegisterFrm.errors.password}                                                                                                                                       
                </small>                                                                                                                                                                      
              )}                                                                                                                                                                              
            </div>                                                                                                                                                                            
                                                                                                                                                                                              
            <div className="form-group">                                                                                                                                                      
              <label htmlFor="repassword" className="form-label">                                                                                                                             
                Confirm password                                                                                                                                                              
              </label>                                                                                                                                                                        
              <input                                                                                                                                                                          
                id="repassword"                                                                                                                                                               
                type={showPassword ? 'text' : 'password'}                                                                                                                                     
                name="repassword"                                                                                                                                                             
                autoComplete="new-password"                                                                                                                                                   
                placeholder="Re-enter your password"                                                                                                                                          
                value={BusinessRegisterFrm.values.repassword}                                                                                                                                 
                onChange={BusinessRegisterFrm.handleChange}                                                                                                                                   
                onBlur={BusinessRegisterFrm.handleBlur}                                                                                                                                       
                className={`form-control ${                                                                                                                                                   
                  BusinessRegisterFrm.errors.repassword && BusinessRegisterFrm.touched.repassword                                                                                             
                    ? 'is-invalid'                                                                                                                                                            
                    : ''                                                                                                                                                                      
                }`}                                                                                                                                                                           
              />                                                                                                                                                                              
              {BusinessRegisterFrm.errors.repassword && BusinessRegisterFrm.touched.repassword && (                                                                                           
                <small className="text-danger">                                                                                                                                               
                  {BusinessRegisterFrm.errors.repassword}                                                                                                                                     
                </small>                                                                                                                                                                      
              )}                                                                                                                                                                              
            </div>                                                                                                                                                                            
                                                                                                                                                                                              
            <label className="auth-terms">                                                                                                                                                    
              <input                                                                                                                                                                          
                type="checkbox"                                                                                                                                                               
                checked={acceptedTerms}                                                                                                                                                       
                onChange={(e) => setAcceptedTerms(e.target.checked)}                                                                                                                          
              />                                                                                                                                                                              
              <span>                                                                                                                                                                          
                I agree to the <NavLink to="/">Terms of Service</NavLink> and{' '}                                                                                                            
                <NavLink to="/">Partner Agreement</NavLink>                                                                                                                                   
              </span>                                                                                                                                                                         
            </label>                                                                                                                                                                          
                                                                                                                                                                                              
            <button                                                                                                                                                                           
              type="submit"                                                                                                                                                                   
              className="btn btn-primary btn-block"                                                                                                                                           
              disabled={isLoading}                                                                                                                                                            
            >                                                                                                                                                                                 
              {isLoading ? (                                                                                                                                                                  
                <>                                                                                                                                                                            
                  <span className="spinner-inline"></span>                                                                                                                                    
                  Creating account...                                                                                                                                                         
                </>                                                                                                                                                                           
              ) : (                                                                                                                                                                           
                'Create business account'                                                                                                                                                     
              )}                                                                                                                                                                              
            </button>                                                                                                                                                                         
                                                                                                                                                                                              
            <p className="auth-footer">                                                                                                                                                       
              Already have a business account?{' '}                                                                                                                                           
              <NavLink to="/business/login">Sign in</NavLink>                                                                                                                                 
            </p>                                                                                                                                                                              
          </form>                                                                                                                                                                             
        </div>                                                                                                                                                                                
      </main>                                                                                                                                                                                 
    )                                                                                                                                                                                         
  }                                                                                                                                                                                           
                                                                                                                                                                                              
  export default Register   