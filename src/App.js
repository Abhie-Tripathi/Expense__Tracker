import React,{useContext} from "react";
import SignupForm from "./components/SignUpForm"
import LoginForm from "./components/LoginForm";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/Home";
import Profile from "./components/Profile";
import { Contexts } from "./components/Contexts";
import ForgotPass from "./components/ForgotPass";


function App() {
  const ctx = useContext(Contexts)


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/register" element={<SignupForm/>}/>
          <Route path="/forgotpassword" element={<ForgotPass/>}/>
          {ctx.isloggedin && <Route path="/home" element={<Home/>}/>}
          {!ctx.isloggedin && <Route path="/home" element={<LoginForm/>}/>}
          {ctx.isloggedin && <Route path="/home/profile" element={<Profile/>}/>}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
