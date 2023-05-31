import React,{useContext} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Home.css';
import { Contexts } from './Contexts';


const Home = () => {
  const navigate = useNavigate()
  const ctx = useContext(Contexts)



  const verifyEmailHandler = () =>{
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB7344iRGQ2vtTko_2awbK36aPE_nCUw2c",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: ctx.token
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
  }).then((data)=>{
    console.log(data)
  })
  .catch(error=>alert(error.message))


  }


  const logoutHandler = () =>{
    ctx.settoken(null)
    navigate("/")
  }


  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <Link to="/" className="navbar-brand">
            Expense Tracker
          </Link> 
        </div>
        <div>
          <ul className="navbar-nav ml-auto d-flex align-items-center">
            <li className="nav-item email-verification">
              <button onClick={verifyEmailHandler} className="btn btn-primary email-verification-btn me-2">
                Verify Email
              </button>
            </li>
            <li className="nav-item">
              <button onClick={logoutHandler} className="btn btn-danger ms-2">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Holy guacamole!</strong> Your Profile is Incomplete{' '}
      <Link to="/home/profile">Complete Now</Link>
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
);
};

export default Home;
