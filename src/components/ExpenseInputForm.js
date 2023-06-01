import React, { useRef, useState,useContext } from "react";
import {Contexts} from "./Contexts"

const ExpenseInputForm = () => {

  const ctx = useContext(Contexts)


  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [successMessage, setSuccessMessage] = useState("");


  if(ctx.editexpense){
  moneyRef.current.value = ctx.editexpense.money;
  descriptionRef.current.value = ctx.editexpense.description;
  categoryRef.current.value = ctx.editexpense.category;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredMoney = moneyRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;

    if(ctx.editexpense){
      fetch(`https://expense-tri-default-rtdb.firebaseio.com/expenseslist/${ctx.editexpense.id}.json`,{
      method:"PUT",
      body:JSON.stringify({
        money: enteredMoney,
        description: enteredDescription,
        category: enteredCategory
      })
    }).then((response)=>response.json()).then((data)=>{
      ctx.setexpenselist({
        id: data.name,
        money: enteredMoney,
        description: enteredDescription,
        category: enteredCategory
      })
    moneyRef.current.value = ""
    descriptionRef.current.value = ""
    categoryRef.current.value = ""
    const updatedExpenses = ctx.expenselist.filter((expense)=> expense.id!== ctx.editexpense.id)
    updatedExpenses.push({
      id: data.name,
      money: enteredMoney,
      description: enteredDescription,
      category: enteredCategory
    })
    ctx.updateexpenselist(updatedExpenses)
    setSuccessMessage("Expense saved successfully!")})

    }

    else{
    fetch("https://expense-tri-default-rtdb.firebaseio.com/expenseslist.json",{
      method:"POST",
      body:JSON.stringify({
        money: enteredMoney,
        description: enteredDescription,
        category: enteredCategory
      })
    }).then((response)=>response.json()).then((data)=>{
      ctx.setexpenselist({
        id: data.name,
        money: enteredMoney,
        description: enteredDescription,
        category: enteredCategory
      })
    moneyRef.current.value = ""
    descriptionRef.current.value = ""
    categoryRef.current.value = ""
    setSuccessMessage("Expense saved successfully!")})}

    
  };

  return (
    <div className="container mt-5">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="money" className="form-label">
            Money Spent
          </label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              id="money"
              ref={moneyRef}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            ref={descriptionRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select className="form-select" id="category" ref={categoryRef} required>
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Save Expense
          </button>
        </div>
      </form>
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ExpenseInputForm;
