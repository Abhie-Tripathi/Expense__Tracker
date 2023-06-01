import React,{useState,useEffect} from 'react'

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
    


    useEffect(() => {
        fetch("https://expense-tri-default-rtdb.firebaseio.com/expenseslist.json")
          .then((response) => response.json())
          .then((data) => {
            const expenses = Object.keys(data).map((expense) => data[expense]);
            setexpenselist((prevExpenses) => [...prevExpenses, ...expenses]);
          });
      }, []);
    
    
        
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