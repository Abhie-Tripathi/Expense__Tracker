import React from "react";
import "./ExpenseList.css";
import {useDispatch,useSelector} from "react-redux"
import { ExpenseSliceActions } from "./ExpenseSlice";

const ExpenseList = () => {
  const dispatch = useDispatch()
  const expenselist = useSelector((state)=>state.expense.expenselist)
  const email = localStorage.getItem("email")


  const handleEdit = (expense) => {
    dispatch(ExpenseSliceActions.setEditExpense(expense))
  };

  const handleDelete = (expenseId) => {
    fetch(`https://expense-tri-default-rtdb.firebaseio.com/${email}/${expenseId}.json`,{
      method:"DELETE",
      headers:{"Content-Type":"application/json"}
    }).then((response) => {
      if (response.ok) {
        const updatedExpenses = expenselist.filter((expense) => expense.id !== expenseId);
        dispatch(ExpenseSliceActions.updateExpenseList(updatedExpenses))
      } else {
        throw new Error('Failed to delete expense');
      }
    })
    .catch((error) => {
      console.log(error);
    });



  };

  return (
    <div className="container mt-5">
      <h3>Expense List</h3>
      {expenselist.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul className="list-group mt-3">
          {expenselist.map((expense, index) => (
            <li className="list-group-item expense-item" key={index}>
              <div className="row align-items-center">
                <div className="col-8">
                  <h5>{expense.description}</h5>
                  <p className="mb-0">Category: {expense.category}</p>
                </div>
                <div className="col-4 text-end">
                  <h4 className="expense-price">${expense.money}</h4>
                  <div className="expense-buttons">
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(expense)}
                      style={{ marginRight: "5px" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(expense.id)}
                      style={{ marginLeft: "-5px" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
