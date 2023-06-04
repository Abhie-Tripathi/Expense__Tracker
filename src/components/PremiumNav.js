import React, { useState } from "react";
import {CSVLink} from "react-csv"
import {useSelector,useDispatch} from "react-redux"
import { authSliceAction } from "./AuthSlice";



const headers = [
    { label: "Expense Name", key: "description" },
    { label: "Category", key: "category" },
    { label: "Amount", key: "money" }
  ];

  
  const PremiumNavbar = () => {
    const dispatch = useDispatch()
    const data = useSelector((state)=>state.expense.expenselist)
    const isDarkMode = useSelector((state)=>state.auth.isDarkMode)
    

    
    const csvReport = {
        data: data,
        headers: headers,
        filename: 'Expenses.csv'
      }; 
      

  const handleToggle = () => {
    dispatch(authSliceAction.setisDarkMode())
  };

 

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-end align-items-center">
        <div className="me-2">
        <CSVLink {...csvReport} className="btn btn-primary">Download Expenses</CSVLink>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="darkModeSwitch"
            checked={isDarkMode}
            onChange={handleToggle}
          />
          <label className="form-check-label" htmlFor="darkModeSwitch">
            Dark Mode
          </label>
        </div>
      </div>
    </nav>
  );
};

export default PremiumNavbar;
