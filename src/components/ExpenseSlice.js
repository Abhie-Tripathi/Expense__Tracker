import {createSlice} from "@reduxjs/toolkit"

const expenseSlice = createSlice({
    name: "ExpenseList",
    initialState:{expenselist:[],editexpense:null},
    reducers:{
        setExpenseList(state,actions){
            state.expenselist = [...state.expenselist,actions.payload]
        },
        updateExpenseList(state,actions){
            state.expenselist = actions.payload
        },
        setEditExpense(state,actions){
            state.editexpense = actions.payload
        }

    }
})

export const ExpenseSliceActions = expenseSlice.actions
export default expenseSlice