import React, {useState} from "react"
import {withRouter} from "react-router-dom"
import axios from "axios"
import CustomerForm from "../utils/CredentialForm"
import {isAuth, authenticate} from "./Helpers"

const Signin = ({history}) => {
  const [userDetails, setUserDetails] = useState({
    password: "",
    email: ""
  })
  const {password, email} = userDetails
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState(false)
  /**@param name the name of the input whose value changed
   * @param e the event listener
   * set the value to the corresponding filed
   */
  const handleChange = (name) => (e) => {
    setUserDetails({...userDetails, [name]: e.target.value})
  }

  /** Sends a POST request to th DB with the email and password to signin
   * and redirects to todos if the provided userDetails were correct
   */
  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault()
    axios
      .post("/signin", {email, password})
      .then((response) => {
        authenticate(response)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        if (err.message.includes("code 401")) setCredentials(true)
        setIsLoading(false)
      })
  }
  return (
    <div className="container">
      {isAuth() && isAuth().role === "admin"}
      <div className="main">
        {isAuth() && isAuth().role === "admin" ? (
          history.push(`/event/admin/${isAuth().id}/all`)
        ) : (
          <>
            {isAuth() && isAuth().role === "user" ? (
              history.push(`/event/get/${isAuth().id}/all`)
            ) : (
              <CustomerForm
                buttonText={"Signin"}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                credentials={credentials}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default withRouter(Signin)
