import React, {useState} from "react"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import {Button, ListGroup} from "react-bootstrap"
import {getCookie, isAuth} from "../auth/Helpers"
import axios from "axios"
import LoadingButton from "../utils/LoadingButton"
import {withRouter} from "react-router-dom"
import Toastify from "../utils/Toastify"
import {useEffect} from "react"

const RegistrationForm = ({eventID, history}) => {
  const [eventDetails, setEventDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getDetails = async () => {
      try {
        const {data} = await axios.get(`/event/details/${eventID}`, {
          data: {userID: isAuth().id}
        })
        setEventDetails(data)
      } catch (error) {
        if (error.status === 402) {
          alert(error.message)
        }
      }
    }
    getDetails()
  }, [])
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
        toast.success("Your registration was successful")
        setTimeout(() => {
          history.push(`/event/get/${isAuth().id}/all`)
        }, 4100)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        const {status} = err.response
        if (status === 402) {
          toast.error(`You have already registered for this event`)
          setTimeout(() => {
            history.push(`event/get/${isAuth().id}/more`)
          }, 4200)
        } else if (status === 201) {
          toast.success(`Registration successful`)
        } else {
          toast.error(`Something went wrong`)
        }
      })
  }
  const handleGoBack = (url) => {
    history.push(url)
  }
  const {details, venue} = eventDetails
  return (
    <>
      {eventDetails.hasOwnProperty("details") ? (
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
      ) : (
        <div className="w-50 mt-5">Getting details ...</div>
      )}
    </>
  )
}

export default withRouter(RegistrationForm)
