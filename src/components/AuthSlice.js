import {createSlice} from "@reduxjs/toolkit"

const initialtoken = localStorage.getItem("Token")

const authSlice = createSlice({
    name:"Authentication",
    initialState: {isloggedin:!!initialtoken,token:initialtoken,isDarkMode:false},
    reducers:{
        setToken(state,actions){
            state.token = actions.payload
        },
        login(state){
            state.isloggedin = true
        },
        logout(state){
            state.isloggedin = false
        },
        setisDarkMode(state){
            state.isDarkMode = !state.isDarkMode
        }
    }

})

export const authSliceAction = authSlice.actions
export default authSlice