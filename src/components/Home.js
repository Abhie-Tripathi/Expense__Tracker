import React,{useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Home.css';
import ExpenseInputForm from './ExpenseInputForm';
import ExpenseList from './ExpenseList';
import {useDispatch,useSelector} from "react-redux"
import {authSliceAction} from "./AuthSlice"
import { ExpenseSliceActions } from './ExpenseSlice';
import PremiumNavbar from './PremiumNav';

const Home = () => {
  const [isPremiumActivated,setisPremiumActivated] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state)=>state.auth.token)
  const expenselist = useSelector((state)=>state.expense.expenselist)


  const verifyEmailHandler = () =>{
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB7344iRGQ2vtTko_2awbK36aPE_nCUw2c",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: token
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

  useEffect(() => {
    fetch('https://expense-tri-default-rtdb.firebaseio.com/expenseslist.json')
      .then((response) => response.json())
      .then((data) => {if(data){
        const expenses = Object.keys(data).map((expense) => ({ id: expense, ...data[expense] }));
        dispatch(ExpenseSliceActions.updateExpenseList([...expenses]))
}});
  },[]);




  const logoutHandler = () =>{
    dispatch(authSliceAction.setToken(null))
    dispatch(authSliceAction.logout())
    localStorage.removeItem("Token")
    navigate("/")
  }
  
  const moneylist = expenselist.map((expense) => +expense.money);
  const sum = moneylist.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const activatePremiumHandler = () => {
    setisPremiumActivated(true)
  };


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
              <li className="nav-item">
                <button
                  style={+sum<1000 ? {display:"none"}: {}}
                  onClick={activatePremiumHandler}
                  className="btn btn-success me-2"
                >
                  Activate Premium
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={verifyEmailHandler}
                  className="btn btn-primary me-2"
                >
                  Verify Email
                </button>
              </li>
              <li className="nav-item">
                <Link to="/home/profile" className="btn btn-secondary me-2">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={logoutHandler}
                  className="btn btn-danger"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

        {isPremiumActivated && <PremiumNavbar/>}
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> Your Profile is Incomplete{' '}
        <Link to="/home/profile">Complete Now</Link>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <ExpenseInputForm />
      <ExpenseList />
    </div>
);
};

export default Home;
