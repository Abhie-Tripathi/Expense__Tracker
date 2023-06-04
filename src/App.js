import React from "react";
import SignupForm from "./components/SignUpForm"
import LoginForm from "./components/LoginForm";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/Home";
import Profile from "./components/Profile";
import ForgotPass from "./components/ForgotPass";
import {useSelector} from "react-redux"


function App() {
  
  const isloggedin = useSelector((state)=>state.auth.isloggedin)
  


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/register" element={<SignupForm/>}/>
          <Route path="/forgotpassword" element={<ForgotPass/>}/>
          {isloggedin && <Route path="/home" element={<Home/>}/>}
          {!isloggedin && <Route path="/home" element={<LoginForm/>}/>}
          {isloggedin && <Route path="/home/profile" element={<Profile/>}/>}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
