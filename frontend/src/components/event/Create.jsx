import React from "react"
import {eventInitialValues} from "../helpers/formikInitialValues"
import EventForm from "../utils/EventForm"

const CreateEventForm = () => {
  return (
    <EventForm
      initialValues={eventInitialValues}
      url="/api/event"
      method="post"
      btnText="Create"
    />
  )
}

export default CreateEventForm
