import React, { useState } from "react";
import {CSVLink} from "react-csv"
import {useSelector} from "react-redux"


const headers = [
    { label: "Expense Name", key: "description" },
    { label: "Category", key: "category" },
    { label: "Amount", key: "money" }
  ];

  
  const PremiumNavbar = () => {
    const data = useSelector((state)=>state.expense.expenselist)
    const [isDarkMode, setIsDarkMode] = useState(false);

    
    const csvReport = {
        data: data,
        headers: headers,
        filename: 'Expenses.csv'
      }; 
      

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle light/dark mode here
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
