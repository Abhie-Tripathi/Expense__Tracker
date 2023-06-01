import React, { useContext } from "react";
import "./ExpenseList.css";
import { Contexts } from "./Contexts";

const ExpenseList = () => {
  const ctx = useContext(Contexts);

  const handleEdit = (expense) => {
    ctx.seteditexpense(expense)
  };

  const handleDelete = (expenseId) => {
    fetch(`https://expense-tri-default-rtdb.firebaseio.com/expenseslist/${expenseId}.json`,{
      method:"DELETE",
      headers:{"Content-Type":"application/json"}
    }).then((response) => {
      if (response.ok) {
        const updatedExpenses = ctx.expenselist.filter((expense) => expense.id !== expenseId);
        ctx.updateexpenselist(updatedExpenses);
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
      {ctx.expenselist.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul className="list-group mt-3">
          {ctx.expenselist.map((expense, index) => (
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
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(expense.id)}
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
