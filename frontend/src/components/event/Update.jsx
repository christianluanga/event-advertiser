import React, {useEffect, useState} from "react"
import axios from "axios"
import EventForm from "../utils/EventForm"
import {getCookie} from "../auth/Helpers"

const UpdateEventForm = ({id}) => {
  const [initialValues, setInitialValues] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    axios
      .get(`/api/event/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        setInitialValues(response.data)
        setIsLoaded(true)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [id])

  return (
    <>
      {isLoaded ? (
        <EventForm
          initialValues={initialValues}
          url={`/api/event/${id}`}
          method="put"
          btnText="Update"
          message="updated"
        />
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  )
}

export default UpdateEventForm
