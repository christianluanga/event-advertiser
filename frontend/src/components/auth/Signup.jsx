import React, {useState} from "react"
import {withRouter} from "react-router-dom"
import axios from "axios"
import CustomerForm from "../utils/CredentialForm"
import Toastify from "../utils/Toastify"
import {toast} from "react-toastify"

const Signup = ({history}) => {
  const [userDetails, setUserDetails] = useState({
    password: "",
    email: "",
    name: ""
  })
  const {password, email, name} = userDetails
  const [isLoading, setIsLoading] = useState(false)
  /**@param name the name of the input whose value changed
   * @param e the event listener
   * set the value to the corresponding filed
   */
  const handleChange = (name) => (e) => {
    setUserDetails({...userDetails, [name]: e.target.value})
  }

  /** Sends a POST request to th DB with the email and password to signup
   * and redirects to todos if the provided userDetails were correct
   */
  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault()
    axios
      .post("/signup", {email, password, name})
      .then((response) => {
        toast.success("registration successful")
        setTimeout(() => {
          history.push("/")
        }, 4100)
        setIsLoading(false)
      })
      .catch((err) => {
        toast.error("Something went wrong registration not successful")
        setIsLoading(false)
      })
  }
  return (
    <div className="container">
      <Toastify duration={4000} />
      <div className="main">
        <CustomerForm
          buttonText={"Signup"}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default withRouter(Signup)
