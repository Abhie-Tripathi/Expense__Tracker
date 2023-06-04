import {createSlice} from "@reduxjs/toolkit"

const initialtoken = localStorage.getItem("Token")

const authSlice = createSlice({
    name:"Authentication",
    initialState: {isloggedin:!!initialtoken,token:initialtoken},
    reducers:{
        setToken(state,actions){
            state.token = actions.payload
        },
        login(state){
            state.isloggedin = true
        },
        logout(state){
            state.isloggedin = false
        }
    }

})

export const authSliceAction = authSlice.actions
export default authSlice