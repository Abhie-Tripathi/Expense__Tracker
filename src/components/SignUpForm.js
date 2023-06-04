import React,{useRef} from 'react'

const SignUpForm = () => {
    const emailinputref = useRef()
    const passwordinputref = useRef()


    const onsignuphandler = () =>{
        const enteredemail = emailinputref.current.value
        const enteredpassword = passwordinputref.current.value

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7344iRGQ2vtTko_2awbK36aPE_nCUw2c",{
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          email:enteredemail,
          password:enteredpassword,
          returnSecureToken:true
        })

      }).then((response) => {
        if (response.ok) {
          return response.json()
          //If the post is successfull
        } else {
          //If the post is unsuccessfull
          return response.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) errorMessage = data.error.message;
            
          throw new Error(errorMessage);
          });
        }
      })
      .then((data)=>{
        console.log(data,"User has sucessfully signed up")
    


      })
      .catch((err)=>{
        alert(err.message)
      })
            

        
    }




  return (
    <section className="vh-100" style={{backgroundColor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" placeholder='Your Email' ref={emailinputref} className="form-control" />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" placeholder='Password' ref={passwordinputref} className="form-control" />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" placeholder='Repeat your password' className="form-control" />
                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button onClick={onsignuphandler} type="button" className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default SignUpForm