import React, { useRef, useState } from "react";
import { ExpenseSliceActions } from "./ExpenseSlice";

import {useDispatch,useSelector} from "react-redux"

const ExpenseInputForm = () => {

  const dispatch = useDispatch()
  const editexpense = useSelector((state)=>state.expense.editexpense)
  const expenselist = useSelector((state)=>state.expense.expenselist)


  const moneyRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [successMessage, setSuccessMessage] = useState("");


  if(editexpense){
  moneyRef.current.value = editexpense.money;
  descriptionRef.current.value = editexpense.description;
  categoryRef.current.value = editexpense.category;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredMoney = moneyRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;

    if(editexpense){
      fetch(`https://expense-tri-default-rtdb.firebaseio.com/expenseslist/${editexpense.id}.json`,{
      method:"PUT",
      body:JSON.stringify({
        money: enteredMoney,
        description: enteredDescription,
        category: enteredCategory
      })
    }).then((response)=>response.json()).then((data)=>{
      dispatch(ExpenseSliceActions.setExpenseList({
        id: data.name,
        money: enteredMoney,
        description: enteredDescription,
        category: enteredCategory
      }))
    moneyRef.current.value = ""
    descriptionRef.current.value = ""
    categoryRef.current.value = ""
    const updatedExpenses = expenselist.filter((expense)=> expense.id!== editexpense.id)
    updatedExpenses.push({
      id: data.name,
      money: enteredMoney,
      description: enteredDescription,
      category: enteredCategory
    })
    dispatch(ExpenseSliceActions.updateExpenseList(updatedExpenses))
    dispatch(ExpenseSliceActions.setEditExpense(null))
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
      dispatch(ExpenseSliceActions.setExpenseList({
        id: data.name,
        money: enteredMoney,
        description: enteredDescription,
        category: enteredCategory
      }))
    moneyRef.current.value = ""
    descriptionRef.current.value = ""
    categoryRef.current.value = ""
    setSuccessMessage("Expense saved successfully!")})}

    
  };

  return (
    <div className="container mt-5">
      <div className="expense-input-form border rounded p-4">
        <h3 className="mb-4">Add Expense</h3>
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
            <select
              className="form-select"
              id="category"
              ref={categoryRef}
              required
            >
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
    </div>
  );
};

export default ExpenseInputForm;
