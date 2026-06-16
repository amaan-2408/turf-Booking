import { useState } from 'react'                                                                                                                                                            
  import { NavLink, useNavigate, Link } from 'react-router-dom'                                                                                                                               
  import { useFormik } from 'formik'                                                                                                                                                          
  import axios from 'axios'                                                                                                                                                                   
  import UserLoginSchema from '../../schema/UserLoginSchema'                                                                                                                                  
                                                                                                                                                                                              
  const Login = () => {                                                                                                                                                                       
    const navigate = useNavigate()                                                                                                                                                            
    const [errMsg, setErrMsg] = useState('')                                                                                                                                                  
    const [isLoading, setIsLoading] = useState(false)                                                                                                                                         
    const [showPassword, setShowPassword] = useState(false)                                                                                                                                   
                                                                                                                                                                                              
    const LoginFrm = useFormik({                                                                                                                                                              
      validationSchema: UserLoginSchema,                                                                                                                                                      
      initialValues: {                                                                                                                                                                        
        email: '',                                                                                                                                                                            
        password: '',                                                                                                                                                                         
      },                                                                                                                                                                                      
      onSubmit: (FormData) => {                                                                                                                                                               
        setErrMsg('')                                                                                                                                                                         
        setIsLoading(true)                                                                                                                                                                    
                                                                                                                                                                                              
        axios                                                                                                                                                                                 
          .post('http://localhost:3000/api/v1/user/auth', FormData)                                                                                                                           
          .then((response) => {                                                                                                                                                               
            if (response.data.success === false) {                                                                                                                                            
              // Both errType 1 (no email) and errType 2 (wrong password) get                                                                                                                 
              // the same message — prevents email enumeration.                                                                                                                               
              setErrMsg('Email or password is incorrect')                                                                                                                                     
              setIsLoading(false)                                                                                                                                                             
              return                                                                                                                                                                          
            }                                                                                                                                                                                 
                                                                                                                                                                                              
            localStorage.setItem('user_access', response.data.token)                                                                                                                          
            localStorage.setItem('name', response.data.name)                                                                                                                                  
            navigate('/user/myaccount')                                                                                                                                                       
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
                                                                                                                                                                                              
          <h1>Welcome back</h1>                                                                                                                                                               
          <p className="auth-subtitle">Sign in to book your next game</p>                                                                                                                     
                                                                                                                                                                                              
          {errMsg && (                                                                                                                                                                        
            <div className="alert-error" role="alert">                                                                                                                                        
              <i className="fa fa-exclamation-circle"></i>                                                                                                                                    
              <span>{errMsg}</span>                                                                                                                                                           
            </div>                                                                                                                                                                            
          )}                                                                                                                                                                                  
                                                                                                                                                                                              
          <form onSubmit={LoginFrm.handleSubmit} className="auth-form" noValidate>                                                                                                            
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
                value={LoginFrm.values.email}                                                                                                                                                 
                onChange={LoginFrm.handleChange}                                                                                                                                              
                onBlur={LoginFrm.handleBlur}                                                                                                                                                  
                className={`form-control ${                                                                                                                                                   
                  LoginFrm.errors.email && LoginFrm.touched.email ? 'is-invalid' : ''                                                                                                         
                }`}                                                                                                                                                                           
              />                                                                                                                                                                              
              {LoginFrm.errors.email && LoginFrm.touched.email && (                                                                                                                           
                <small className="text-danger">{LoginFrm.errors.email}</small>                                                                                                                
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
                  value={LoginFrm.values.password}                                                                                                                                            
                  onChange={LoginFrm.handleChange}                                                                                                                                            
                  onBlur={LoginFrm.handleBlur}                                                                                                                                                
                  className={`form-control ${                                                                                                                                                 
                    LoginFrm.errors.password && LoginFrm.touched.password ? 'is-invalid' : ''                                                                                                 
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
              {LoginFrm.errors.password && LoginFrm.touched.password && (                                                                                                                     
                <small className="text-danger">{LoginFrm.errors.password}</small>                                                                                                             
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
              New to Game On Turf? <NavLink to="/user/signup">Create an account</NavLink>                                                                                                     
            </p>                                                                                                                                                                              
          </form>                                                                                                                                                                             
        </div>                                                                                                                                                                                
      </main>                                                                                                                                                                                 
    )                                                                                                                                                                                         
  }                                                                                                                                                                                           
                                                                                                                                                                                              
  export default Login       