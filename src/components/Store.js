import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./AuthSlice"
import expenseSlice from "./ExpenseSlice"

const store = configureStore({reducer:{auth:authSlice.reducer,expense:expenseSlice.reducer}})




export default store