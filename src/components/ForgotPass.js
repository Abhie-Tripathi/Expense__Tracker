import React, { useRef,useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";

const ForgotPass = () => {

  const emailRef = useRef();
  const [isloading,setisloading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    setisloading(true)

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB7344iRGQ2vtTko_2awbK36aPE_nCUw2c",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: enteredEmail
            })
        }).then((response)=>{
            setisloading(false)
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
        }).then((data)=>{
          
        })
        .catch(error=>alert(error.message))
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Forgot Password</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    ref={emailRef}
                    required
                  />
                </div>
                <div className="text-center">
                  {!isloading && <button type="submit" className="btn btn-primary">
                    Reset Password
                  </button>}
                  {isloading && <p>loading...</p>}
                </div>
              </form>
              <div className="mt-3">
                <Link to="/" className="btn btn-link">
                  <BsArrowLeftShort className="me-1" /> Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
