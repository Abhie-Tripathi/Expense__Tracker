import React, { useRef,useContext } from 'react';
import { AiOutlineUser, AiOutlineLink } from 'react-icons/ai';
import { Contexts } from './Contexts';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const profileurlinputref = useRef()
  const fullnameinputref = useRef()

  const navigate = useNavigate()

  const ctx = useContext(Contexts)

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredfullname =  fullnameinputref.current.value
    const enteredprofileurl = profileurlinputref.current.value

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB7344iRGQ2vtTko_2awbK36aPE_nCUw2c",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            displayName:enteredfullname,
            idToken:ctx.token,
            photoUrl:enteredprofileurl,
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
    }).then((data)=>{
      ctx.settoken(data.idToken)
      navigate("/home")
    })
    .catch(error=>alert(error.message))
    
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="profile-form" style={{ width: '30vw' }}>
        <h2 className="text-center mt-5">Profile</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label htmlFor="fullName">
              <AiOutlineUser className="mr-2" /> Full Name:
            </label>
            <input
              type="text"
                ref={fullnameinputref}
              className="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="imageUrl">
              <AiOutlineLink className="mr-2" /> Image URL:
            </label>
            <input
              type="url"
              ref={profileurlinputref}
              className="form-control"
              placeholder="Enter the URL of your profile image"
              required
            />
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
