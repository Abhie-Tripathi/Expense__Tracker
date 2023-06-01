import React,{useContext} from "react";
import "./ExpenseList.css";
import { Contexts } from "./Contexts";

const ExpenseList = () => {
  const ctx = useContext(Contexts)

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
