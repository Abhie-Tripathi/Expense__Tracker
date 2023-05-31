import React,{useRef} from 'react'
import "./LoginForm.css"
import { Link, useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const navigate = useNavigate()
    const emailinputref = useRef()
    const passwordinputref = useRef()




    const onloginhandler = (event) =>{
        const enteredemail = emailinputref.current.value
        const enteredpassword = passwordinputref.current.value


        event.preventDefault()
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7344iRGQ2vtTko_2awbK36aPE_nCUw2c",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email: enteredemail,
                password: enteredpassword,
                returnSecureToken: true
            })
        }).then((response)=>{
            if(response.ok){
                return(response.json())
            }
            else{
                return response.json().then((data)=>{
                    let errorMessage = "Authentication Error"
                    if(data && data.error && data.error.message) errorMessage = data.error.message

                throw new Error(errorMessage)
                })
            }
        }).then((data)=>navigate("/home"))
        .catch(error=>alert(error.message))
    }


    
  return (
    <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input type="email" ref={emailinputref} className="form-control form-control-lg"
              placeholder="Enter your email address" />
            <label className="form-label" htmlFor="form3Example3">Email address</label>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-3">
            <input type="password" ref={passwordinputref} className="form-control form-control-lg"
              placeholder="Enter password" />
            <label className="form-label" htmlFor="form3Example4">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            {/* <!-- Checkbox --> */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button onClick={onloginhandler} type="button" className="btn btn-primary btn-lg"
              style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register" className="link-danger"> Register</Link>
                </p>
          </div>

        </form>
      </div>
    </div>
  </div>
  <div
    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
    {/* <!-- Copyright --> */}
    <div className="text-white mb-3 mb-md-0">
      Copyright © 2023. All rights reserved.
    </div>
    {/* <!-- Copyright --> */}

    {/* <!-- Right --> */}
    <div>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-google"></i>
      </a>
      <a href="#!" className="text-white">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
    {/* <!-- Right --> */}
  </div>
</section>
  )
}

export default LoginForm