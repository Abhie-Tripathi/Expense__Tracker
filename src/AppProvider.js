import {Provider} from "react-redux"
import store from "./components/Store";
import App from "./App";
import React from 'react'

const AppProvider = () => {
  return (
    <Provider store={store}>
        <App/>
    </Provider>
  )
}

export default AppProvider