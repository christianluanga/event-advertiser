import React, {useState} from "react"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import {Button, ListGroup} from "react-bootstrap"
import {getCookie, isAuth} from "../auth/Helpers"
import axios from "axios"
import LoadingButton from "../utils/LoadingButton"
import {withRouter} from "react-router-dom"
import Toastify from "../utils/Toastify"

const RegistrationForm = ({eventID, history}) => {
  const {details, venue} = JSON.parse(
    sessionStorage.getItem("unfilteredEvents")
  )
    .concat(JSON.parse(sessionStorage.getItem("events")))
    .find((event) => {
      return event._id === eventID
    })
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault()
    axios({
      method: "post",
      url: `/api/user/event/${eventID}`,
      data: {userID: isAuth().id},
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        toast.success("You registration was successful")
        setTimeout(() => {
          history.push(`/event/get/${isAuth().id}/all`)
        }, 4100)
        setIsLoading(false)
      })
      .catch((err) => {
        toast.error(`Something went wrong ${err.message}`)
        setIsLoading(false)
      })
  }
  const handleGoBack = (url) => {
    history.push(url)
  }
  return (
    <div className="w-50 my-3" style={{margin: "0 auto"}}>
      <Toastify duration={4000} />
      <h3>Confirm Your registration for {details.title}</h3>
      <ListGroup className="pb-3">
        <ListGroup.Item>
          Title <strong>{details.title}</strong> | Date{" "}
          <strong>{details.date}</strong>
        </ListGroup.Item>
        <ListGroup.Item>
          Category <strong>{details.category}</strong> | Venue {venue.name}
        </ListGroup.Item>
        <ListGroup.Item>
          Description <strong>{details.description}</strong>
        </ListGroup.Item>
        <ListGroup.Item>
          Hosted By <strong>{details.host}</strong>
        </ListGroup.Item>
      </ListGroup>
      {!isLoading ? (
        <div style={{margin: "0 auto"}}>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Register
          </Button>
          <Button
            variant="warning"
            className="mx-3"
            type="submit"
            onClick={() => handleGoBack(`/event/get/${isAuth().id}/all`)}
          >
            Back To The Events
          </Button>
          <Button
            variant="info"
            type="submit"
            onClick={() =>
              handleGoBack(`/event/${details.category}/${eventID}`)
            }
          >
            Back To Event Details
          </Button>
        </div>
      ) : (
        <LoadingButton buttonText="Registering" />
      )}
    </div>
  )
}

export default withRouter(RegistrationForm)
