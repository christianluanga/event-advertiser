import React from "react"
import {toast} from "react-toastify"
import {useFormik} from "formik"
import axios from "axios"
import FormControlInputText from "../form control/TextField"
import {getCookie, isAuth} from "../auth/Helpers"
import Toastify from "./Toastify"
import {withRouter} from "react-router-dom"
import {useState} from "react"
import LoadingButton from "./LoadingButton"

const EventForm = ({initialValues, url, method, history, btnText, message}) => {
  const [isLoading, setIsLoading] = useState(false)
  const formik = useFormik({
    initialValues: {...initialValues, createdBy: isAuth().id},
    onSubmit: (values) => {
      setIsLoading(true)
      axios({
        method: method,
        url: url,
        data: values,
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
        .then((response) => {
          setIsLoading(false)
          toast.success(`Event succefully ${message}`)
          setTimeout(() => {
            history.push(`/event/get/${isAuth().id}/all`)
          }, 3100)
        })
        .catch((err) => {
          setIsLoading(false)
          toast.error(`Event not ${message}, ${err.message}`)
        })
    }
  })

  return (
    <div style={{margin: "1rem auto"}}>
      <Toastify />
      <h5 className="text-muted my-3">Event Details</h5>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group row">
          <label
            htmlFor="inputTitle"
            className="col-sm-3 col-md-1 col-form-label"
          >
            Title
          </label>
          <div className="col-sm-9 col-md-6 col-lg-5">
            <FormControlInputText
              type="text"
              id="inputTitle"
              name="details.title"
              placeholder="Event Title"
              formik={formik}
              value={formik.values.details.title}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="inputImageUrl"
            className="col-sm-3 col-md-1 col-form-label"
          >
            Image Url
          </label>
          <div className="col-sm-9 col-md-6 col-lg-5">
            <FormControlInputText
              type="text"
              id="inputImageUrl"
              name="details.imageUrl"
              placeholder="Image url"
              formik={formik}
              value={formik.values.details.imageUrl}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="inputDecription"
            className="col-sm-3 col-md-1 col-form-label"
          >
            Description
          </label>
          <div className="col-sm-9 col-md-6 col-lg-5">
            <textarea
              className="form-control"
              id="inputDecription"
              name="details.description"
              placeholder="Event description"
              onChange={formik.handleChange}
              value={formik.values.details.description}
            ></textarea>
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="inputCategory"
            className="col-sm-3 col-md-1 col-form-label"
          >
            Category
          </label>
          <div className="col-sm-9 col-md-6 col-lg-5">
            <select
              id="inputCategory"
              className="form-control"
              name="details.category"
              onChange={formik.handleChange}
              value={formik.values.details.category}
            >
              <option selected>Event Category</option>
              <option value="conference">Conference</option>
              <option value="concert">Concert</option>
              <option value="sport">Sport</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="inputDate"
            className="col-sm-3 col-md-1 col-form-label"
          >
            Date
          </label>
          <div className="col-sm-9 col-md-6 col-lg-5">
            <FormControlInputText
              type="date"
              id="inputDate"
              name="details.date"
              placeholder="Event Date"
              formik={formik}
              value={formik.values.details.date}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="inputCategory"
            className="col-sm-3 col-md-1 col-form-label"
          >
            Status
          </label>
          <div className="col-sm-9 col-md-6 col-lg-5">
            <select
              id="inputStatus"
              className="form-control"
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
            >
              <option value="upcoming">Upcoming</option>
              <option value="canceled">Canceled</option>
              <option value="On Hold">On Hold</option>
              <option value="TBC">TBC</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label
            htmlFor="inputDate"
            className="col-sm-3 col-md-1 col-form-label"
          >
            Venue
          </label>
          <div className="col-sm-3 col-md-3 col-lg-2">
            <FormControlInputText
              id="inputVenue"
              name="venue.name"
              placeholder="Event Venue"
              formik={formik}
              value={formik.values.details.name}
            />
          </div>
          <label
            htmlFor="inputCapacity"
            className="col-sm-3 col-md-1 col-form-label"
          >
            Capacity
          </label>
          <div className="col-sm-3 col-md-3 col-lg-2">
            <FormControlInputText
              type="number"
              id="inputCapacity"
              name="venue.capacity"
              placeholder="Venue capacity"
              formik={formik}
              value={formik.values.venue.capacity}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="inputCountry"
            className="col-sm-3 col-md-1 col-form-label"
          >
            Country
          </label>
          <div className="col-sm-3 col-md-3 col-lg-2">
            <FormControlInputText
              type="text"
              id="inputCountry"
              name="venue.country"
              placeholder="Venue Country"
              formik={formik}
              value={formik.values.venue.country}
            />
          </div>
          <label
            htmlFor="inputCity"
            className="col-sm-3 col-md-1 col-form-label"
          >
            City
          </label>
          <div className="col-sm-3 col-md-3 col-lg-2">
            <FormControlInputText
              type="text"
              id="inputCity"
              name="venue.city"
              placeholder="Venue City"
              formik={formik}
              value={formik.values.venue.city}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="inputTitle"
            className="col-sm-3 col-md-1 col-form-label"
          >
            Hosted By
          </label>
          <div className="col-sm-9 col-md-6 col-lg-5">
            <FormControlInputText
              type="text"
              id="inputHost"
              name="details.host"
              placeholder="Event Host"
              formik={formik}
              value={formik.values.details.host}
            />
          </div>
        </div>
        <div
          style={{
            display:
              formik.values.details.category === "conference"
                ? "hidden"
                : "block"
          }}
        >
          <h5 className="text-muted my-3">Speakers Details</h5>
          <div className="form-group row">
            <label
              htmlFor="inputSpeaker1"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Speaker 1
            </label>
            <div className="col-sm-9 col-md-6 col-lg-5">
              <FormControlInputText
                type="text"
                id="inputSpeaker1"
                name="speakers[0].name"
                placeholder="Speaker 1"
                formik={formik}
                value={formik.values.speakers[0].name}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="inputSpeaker1Slot1"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Time
            </label>
            <div className="col-sm-3 col-md-3 col-lg-2">
              <FormControlInputText
                type="time"
                id="inputSpeaker1Slot1"
                name="speakers[0].slots[0].time"
                placeholder="Speaker 1 Slot 1"
                formik={formik}
                value={formik.values.speakers[0].slots[0].time}
              />
            </div>
            <label
              htmlFor="inputSpeaker1Slot2"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Topic
            </label>
            <div className="col-sm-3 col-md-3 col-lg-2">
              <FormControlInputText
                type="text"
                id="inputSpeaker1Slot2"
                name="speakers[0].slots[0].topic"
                placeholder="Speaker 1 Topic 2"
                formik={formik}
                value={formik.values.speakers[0].slots[0].topic}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="speaker1slot2"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Time
            </label>
            <div className="col-sm-3 col-md-3 col-lg-2">
              <FormControlInputText
                type="time"
                id="inputSpeaker1Slot2"
                name="speakers[0].slots[1].time"
                placeholder="Speaker 1 Slot 2"
                formik={formik}
                value={formik.values.speakers[0].slots[1].time}
              />
            </div>
            <label
              htmlFor="inputSpeaker1Slot2"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Topic
            </label>
            <div className="col-sm-3 col-md-3 col-lg-2">
              <FormControlInputText
                type="text"
                id="inputSpeaker1Slot2"
                name="speakers[0].slots[1].topic"
                placeholder="Speaker 1 Topic 2"
                formik={formik}
                value={formik.values.speakers[0].slots[1].topic}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputSpeaker1Slot3"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Time
            </label>
            <div className="col-sm-3 col-md-3 col-lg-2">
              <FormControlInputText
                type="time"
                id="inputSpeaker1Slot3"
                name="speakers[0].slots[2].time"
                placeholder="Speaker 1 Slot 3"
                formik={formik}
                value={formik.values.speakers[0].slots[2].time}
              />
            </div>
            <label
              htmlFor="inputCapacity"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Topic
            </label>
            <div className="col-sm-3 col-md-3 col-lg-2">
              <FormControlInputText
                type="text"
                id="inputSpeaker1Slot3"
                name="speakers[0].slots[2].topic"
                placeholder="Speaker 1 Topic 3"
                formik={formik}
                value={formik.values.speakers[0].slots[2].topic}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputSpeaker1"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Speaker 2
            </label>
            <div className="col-sm-9 col-md-6 col-lg-5">
              <FormControlInputText
                type="text"
                id="inputSpeaker2"
                name="speakers[1].name"
                placeholder="Speaker 2"
                formik={formik}
                value={formik.values.speakers[1].name}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="inputSpeaker2"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Time
            </label>
            <div className="col-sm-3 col-md-3 col-lg-2">
              <FormControlInputText
                type="time"
                id="inputSpeaker2Slot1"
                name="speakers[1].slots[0].time"
                placeholder="Speaker 2 Slot 1"
                formik={formik}
                value={formik.values.speakers[1].slots[0].time}
              />
            </div>
            <label
              htmlFor="inputSpeaker2Slot2"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Topic
            </label>
            <div className="col-sm-3 col-md-3 col-lg-2">
              <FormControlInputText
                type="text"
                id="inputSpeaker2Slot2"
                name="speakers[1].slots[0].topic"
                placeholder="Speaker 2 Topic 2"
                formik={formik}
                value={formik.values.speakers[1].slots[0].topic}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="speaker2slot2"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Time
            </label>
            <div className="col-sm-3 col-md-3 col-lg-2">
              <FormControlInputText
                type="time"
                id="inputSpeaker2Slot2"
                name="speakers[1].slots[1].time"
                placeholder="Speaker 2 Slot 2"
                formik={formik}
                value={formik.values.speakers[1].slots[1].time}
              />
            </div>
            <label
              htmlFor="inputSpeaker2Slot2"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Topic
            </label>
            <div className="col-sm-3 col-md-3 col-lg-2">
              <FormControlInputText
                type="text"
                id="inputSpeaker2Slot2"
                name="speakers[1].slots[1].topic"
                placeholder="Speaker 2 Topic 2"
                formik={formik}
                value={formik.values.speakers[1].slots[1].topic}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputSpeaker2Slot3"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Time
            </label>
            <div className="col-sm-3 col-md-3 col-lg-2">
              <FormControlInputText
                type="time"
                id="inputSpeaker2Slot3"
                name="speakers[1].slots[2].time"
                placeholder="Speaker 2 Slot 3"
                formik={formik}
                value={formik.values.speakers[1].slots[2].time}
              />
            </div>
            <label
              htmlFor="inputCapacity"
              className="col-sm-3 col-md-1 col-form-label"
            >
              Topic
            </label>
            <div className="col-sm-3 col-md-3 col-lg-2">
              <FormControlInputText
                type="text"
                id="inputSpeaker2Slot3"
                name="speakers[1].slots[2].topic"
                placeholder="Speaker 2 Topic 3"
                formik={formik}
                value={formik.values.speakers[1].slots[2].topic}
              />
            </div>
          </div>
        </div>
        {!isLoading ? (
          <button className="btn btn-sm btn-primary mb-2 w-25" type="submit">
            {btnText} Event
          </button>
        ) : (
          <LoadingButton
            buttonText={
              btnText === "created" ? "Creating event " : "Updating event"
            }
          />
        )}
      </form>
    </div>
  )
}

export default withRouter(EventForm)
