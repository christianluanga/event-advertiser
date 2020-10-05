import {Container} from "@material-ui/core"
import {BrowserRouter} from "react-router-dom"
import React from "react"
import "./App.css"
import Router from "./Router"
import MenuBar from "./components/core/MenuBar"

function App() {
  return (
    <BrowserRouter>
      <MenuBar />
      <Container className="App" maxWidth="lg">
        <Router />
      </Container>
    </BrowserRouter>
  )
}

export default App
