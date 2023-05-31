import React,{useState} from 'react'

export const Contexts = React.createContext({
    token: "",
    settoken: ()=>{},
    isloggedin: false
})


const ContextProvider = (props) =>{
    const initialToken = localStorage.getItem("Token")
    const [token,settoken] = useState(initialToken)

    const settokenhandler = (token) =>{
        settoken(token)
    }

    const contextvalue = {
        token: token,
        settoken: settokenhandler,
        isloggedin: !!token
    }

    return(<Contexts.Provider value={contextvalue}>
        {props.children}
    </Contexts.Provider>

    )
}

export default ContextProvider