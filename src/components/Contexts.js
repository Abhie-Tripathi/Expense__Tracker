import React,{useState} from 'react'

export const Contexts = React.createContext({
    token: "",
    settoken: ()=>{}
})


const ContextProvider = (props) =>{
    const [token,settoken] = useState("")

    const settokenhandler = (token) =>{
        settoken(token)
    }

    const contextvalue = {
        token: token,
        settoken: settokenhandler
    }

    return(<Contexts.Provider value={contextvalue}>
        {props.children}
    </Contexts.Provider>

    )
}

export default ContextProvider