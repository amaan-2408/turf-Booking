import { useState } from 'react'                                                                                                                                                            
  import { NavLink, useNavigate, Link } from 'react-router-dom'                                                                                                                               
  import { useFormik } from 'formik'                                                                                                                                                          
  import axios from 'axios'                                                                                                                                                                   
  import SignupFrmSchema from '../../schema/UserSignupSchema'                                                                                                                                 
                                                                                                                                                                                              
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
                                                                                                                                                                                              
  const SignUp = () => {                                                                                                                                                                      
    const navigate = useNavigate()                                                                                                                                                            
    const [errMsg, setErrMsg] = useState('')                                                                                                                                                  
    const [isLoading, setIsLoading] = useState(false)                                                                                                                                         
    const [showPassword, setShowPassword] = useState(false)                                                                                                                                   
    const [acceptedTerms, setAcceptedTerms] = useState(false)                                                                                                                                 
                                                                                                                                                                                              
    const SignupFrm = useFormik({                                                                                                                                                             
      validationSchema: SignupFrmSchema,                                                                                                                                                      
      initialValues: {                                                                                                                                                                        
        name: '',                                                                                                                                                                             
        email: '',                                                                                                                                                                            
        address: '',                                                                                                                                                                          
        password: '',                                                                                                                                                                         
        repassword: '',                                                                                                                                                                       
      },                                                                                                                                                                                      
      onSubmit: (FormData) => {                                                                                                                                                               
        setErrMsg('')                                                                                                                                                                         
                                                                                                                                                                                              
        if (!acceptedTerms) {                                                                                                                                                                 
          setErrMsg('Please accept the terms and conditions to continue.')                                                                                                                    
          return                                                                                                                                                                              
        }                                                                                                                                                                                     
                                                                                                                                                                                              
        setIsLoading(true)                                                                                                                                                                    
        axios                                                                                                                                                                                 
          .post('http://localhost:3000/api/v1/user', FormData)                                                                                                                                
          .then(() => {                                                                                                                                                                       
            navigate('/user/login', {                                                                                                                                                         
              state: { justSignedUp: true },                                                                                                                                                  
            })                                                                                                                                                                                
          })                                                                                                                                                                                  
          .catch((err) => {                                                                                                                                                                   
            setErrMsg(                                                                                                                                                                        
              err?.response?.data?.message ||                                                                                                                                                 
                'Could not create your account. Please try again.'                                                                                                                            
            )                                                                                                                                                                                 
            setIsLoading(false)                                                                                                                                                               
          })                                                                                                                                                                                  
      },                                                                                                                                                                                      
    })                                                                                                                                                                                        
                                                                                                                                                                                              
    const passwordStrength = getPasswordStrength(SignupFrm.values.password)                                                                                                                   
    const strengthBars = passwordStrength ? 4 : 0                                                                                                                                             
    const strengthLabel = {                                                                                                                                                                   
      weak: 'Weak — add length, numbers, and symbols',                                                                                                                                        
      medium: 'Medium — consider adding a special character',                                                                                                                                 
      strong: 'Strong password',                                                                                                                                                              
    }[passwordStrength]                                                                                                                                                                       
                                                                                                                                                                                              
    return (                                                                                                                                                                                  
      <main className="auth-page">                                                                                                                                                            
        <div className="auth-card">                                                                                                                                                           
          <Link to="/" className="auth-brand">                                                                                                                                                
            <i className="fa fa-futbol"></i>                                                                                                                                                  
            <span>Game On Turf</span>                                                                                                                                                         
          </Link>                                                                                                                                                                             
                                                                                                                                                                                              
          <h1>Create your account</h1>                                                                                                                                                        
          <p className="auth-subtitle">Start booking turfs in minutes</p>                                                                                                                     
                                                                                                                                                                                              
          {errMsg && (                                                                                                                                                                        
            <div className="alert-error" role="alert">                                                                                                                                        
              <i className="fa fa-exclamation-circle"></i>                                                                                                                                    
              <span>{errMsg}</span>                                                                                                                                                           
            </div>                                                                                                                                                                            
          )}                                                                                                                                                                                  
                                                                                                                                                                                              
          <form onSubmit={SignupFrm.handleSubmit} className="auth-form" noValidate>                                                                                                           
            <div className="form-group">                                                                                                                                                      
              <label htmlFor="name" className="form-label">                                                                                                                                   
                Full name                                                                                                                                                                     
              </label>                                                                                                                                                                        
              <input                                                                                                                                                                          
                id="name"                                                                                                                                                                     
                type="text"                                                                                                                                                                   
                name="name"                                                                                                                                                                   
                autoComplete="name"                                                                                                                                                           
                placeholder="Your full name"                                                                                                                                                  
                value={SignupFrm.values.name}                                                                                                                                                 
                onChange={SignupFrm.handleChange}                                                                                                                                             
                onBlur={SignupFrm.handleBlur}                                                                                                                                                 
                className={`form-control ${                                                                                                                                                   
                  SignupFrm.errors.name && SignupFrm.touched.name ? 'is-invalid' : ''                                                                                                         
                }`}                                                                                                                                                                           
              />                                                                                                                                                                              
              {SignupFrm.errors.name && SignupFrm.touched.name && (                                                                                                                           
                <small className="text-danger">{SignupFrm.errors.name}</small>                                                                                                                
              )}                                                                                                                                                                              
            </div>                                                                                                                                                                            
                                                                                                                                                                                              
            <div className="form-group">                                                                                                                                                      
              <label htmlFor="email" className="form-label">                                                                                                                                  
                Email address                                                                                                                                                                 
              </label>                                                                                                                                                                        
              <input                                                                                                                                                                          
                id="email"                                                                                                                                                                    
                type="email"                                                                                                                                                                  
                name="email"                                                                                                                                                                  
                autoComplete="email"                                                                                                                                                          
                placeholder="you@example.com"                                                                                                                                                 
                value={SignupFrm.values.email}                                                                                                                                                
                onChange={SignupFrm.handleChange}                                                                                                                                             
                onBlur={SignupFrm.handleBlur}                                                                                                                                                 
                className={`form-control ${                                                                                                                                                   
                  SignupFrm.errors.email && SignupFrm.touched.email ? 'is-invalid' : ''                                                                                                       
                }`}                                                                                                                                                                           
              />                                                                                                                                                                              
              {SignupFrm.errors.email && SignupFrm.touched.email && (                                                                                                                         
                <small className="text-danger">{SignupFrm.errors.email}</small>                                                                                                               
              )}                                                                                                                                                                              
            </div>                                                                                                                                                                            
                                                                                                                                                                                              
            <div className="form-group">                                                                                                                                                      
              <label htmlFor="address" className="form-label">                                                                                                                                
                Address                                                                                                                                                                       
              </label>                                                                                                                                                                        
              <textarea                                                                                                                                                                       
                id="address"                                                                                                                                                                  
                name="address"                                                                                                                                                                
                autoComplete="street-address"                                                                                                                                                 
                placeholder="Your city or area"                                                                                                                                               
                rows={2}                                                                                                                                                                      
                value={SignupFrm.values.address}                                                                                                                                              
                onChange={SignupFrm.handleChange}                                                                                                                                             
                onBlur={SignupFrm.handleBlur}                                                                                                                                                 
                className={`form-control ${                                                                                                                                                   
                  SignupFrm.errors.address && SignupFrm.touched.address ? 'is-invalid' : ''                                                                                                   
                }`}                                                                                                                                                                           
              />                                                                                                                                                                              
              {SignupFrm.errors.address && SignupFrm.touched.address && (                                                                                                                     
                <small className="text-danger">{SignupFrm.errors.address}</small>                                                                                                             
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
                  value={SignupFrm.values.password}                                                                                                                                           
                  onChange={SignupFrm.handleChange}                                                                                                                                           
                  onBlur={SignupFrm.handleBlur}                                                                                                                                               
                  className={`form-control ${                                                                                                                                                 
                    SignupFrm.errors.password && SignupFrm.touched.password ? 'is-invalid' : ''                                                                                               
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
              {SignupFrm.values.password && (                                                                                                                                                 
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
              {SignupFrm.errors.password && SignupFrm.touched.password && (                                                                                                                   
                <small className="text-danger">{SignupFrm.errors.password}</small>                                                                                                            
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
                value={SignupFrm.values.repassword}                                                                                                                                           
                onChange={SignupFrm.handleChange}                                                                                                                                             
                onBlur={SignupFrm.handleBlur}                                                                                                                                                 
                className={`form-control ${                                                                                                                                                   
                  SignupFrm.errors.repassword && SignupFrm.touched.repassword                                                                                                                 
                    ? 'is-invalid'                                                                                                                                                            
                    : ''                                                                                                                                                                      
                }`}                                                                                                                                                                           
              />                                                                                                                                                                              
              {SignupFrm.errors.repassword && SignupFrm.touched.repassword && (                                                                                                               
                <small className="text-danger">{SignupFrm.errors.repassword}</small>                                                                                                          
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
                <NavLink to="/">Privacy Policy</NavLink>                                                                                                                                      
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
                'Create account'                                                                                                                                                              
              )}                                                                                                                                                                              
            </button>                                                                                                                                                                         
                                                                                                                                                                                              
            <p className="auth-footer">                                                                                                                                                       
              Already have an account? <NavLink to="/user/login">Sign in</NavLink>                                                                                                            
            </p>                                                                                                                                                                              
          </form>                                                                                                                                                                             
        </div>                                                                                                                                                                                
      </main>                                                                                                                                                                                 
    )                                                                                                                                                                                         
  }                                                                                                                                                                                           
                                                                                                                                                                                              
  export default SignUp   