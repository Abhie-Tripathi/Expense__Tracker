import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Contexts } from './Contexts';


const Home = () => {
  const ctx = useContext(Contexts)



  const verifyemailhandler = () =>{
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





  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">Expense Tracker</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
              <li className="nav-item email-verification">
                <button onClick={verifyemailhandler} className="btn btn-primary email-verification-btn">Verify Email</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> Your Profile is Incomplete <Link to="/profile">Complete Now</Link>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  );
};

export default Home;
