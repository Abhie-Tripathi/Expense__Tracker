import { render,screen } from "@testing-library/react"
import  AppProvider from "./AppProvider"
import App from "./App"


test("Expense List is showing no items",()=>{
    render(<AppProvider/>)

    const remembermebox = screen.getByText("Remember me")
    expect(remembermebox).toBeInTheDocument
})

