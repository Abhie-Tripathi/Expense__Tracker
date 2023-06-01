import React,{useState} from 'react'

export const Contexts = React.createContext({
    token: "",
    settoken: ()=>{},
    isloggedin: false,
    expenselist: [],
    setexpenselist: ()=>{}
})


const ContextProvider = (props) =>{
    const initialToken = localStorage.getItem("Token")
    const [token,settoken] = useState(initialToken)
    const [expenselist, setexpenselist] = useState([])

    const settokenhandler = (token) =>{
        settoken(token)
    }

    const setexpenselisthandler = (expense) =>{
        setexpenselist((prevexpenselist)=>[...prevexpenselist,expense])
    }

    const contextvalue = {
        token: token,
        settoken: settokenhandler,
        isloggedin: !!token,
        expenselist: expenselist,
        setexpenselist: setexpenselisthandler
    }

    return(<Contexts.Provider value={contextvalue}>
        {props.children}
    </Contexts.Provider>

    )
}

export default ContextProvider