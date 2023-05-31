import React from "react";
import SignupForm from "./components/SignUpForm"
import LoginForm from "./components/LoginForm";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/register" element={<SignupForm/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
