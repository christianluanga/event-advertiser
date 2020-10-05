import React, {useState, useEffect, Fragment} from "react"
import axios from "axios"
import {makeStyles, Grid, Typography, Divider} from "@material-ui/core"
import EventCard from "../core/EventCard"
import {getCookie, isAuth} from "../auth/Helpers"
import {Button} from "react-bootstrap"
import {withRouter} from "react-router-dom"
import UserSideMenu from "../core/SideMenu"
import AdminSideMenu from "../admin/SideMenu"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}))

const EventList = ({user, filter, history}) => {
  const classes = useStyles()
  const [events, setEvents] = useState([])
  const [eventFilter, setEventFilter] = useState("all")
  let URL = "/event/all"

  if (isAuth() && isAuth().role === "user") {
    URL = `/api/user/event/${user}/mine`
  } else if (isAuth() && isAuth().role === "admin") {
    URL = `/api/event/admin/${user}/${filter}`
  }
  useEffect(() => {
    getEvents(URL, "user page")
  }, [URL, eventFilter])
  const getEvents = (url, target) => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        const {data} = response
        setEvents(data)
        sessionStorage.setItem("events", JSON.stringify(data))
        if (target === "user page") {
          sessionStorage.setItem("unfilteredEvents", JSON.stringify(data))
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
  console.log(filter)
  const handleEventFiltering = (status) => {
    //let filteredEvents = []
    const unfilteredEvents = JSON.parse(
      sessionStorage.getItem("unfilteredEvents")
    )
    setEventFilter(status)
    if (status === "all") return setEvents(unfilteredEvents)
    const filteredEvents = unfilteredEvents.filter(
      (event) => event.status === status
    )
    setEvents(filteredEvents)
    history.push(`/event/get/${user}/${eventFilter}`)
  }

  return (
    <div className={(classes.root, "my-5")}>
      <Grid container spacing={3}>
        {isAuth() && isAuth().role === "user" && (
          <UserSideMenu
            eventFilter={eventFilter}
            handleEventFiltering={handleEventFiltering}
            user={user}
            getEvents={getEvents}
            setEventFilter={setEventFilter}
          />
        )}
        {isAuth() && isAuth().role === "admin" && (
          <AdminSideMenu
            eventFilter={eventFilter}
            handleEventFiltering={handleEventFiltering}
          />
        )}
        {events.length > 0 ? (
          <Fragment>
            {events.map((event, index) => (
              <Grid item sm={12} lg={3} key={index}>
                <EventCard
                  id={event._id}
                  details={event.details}
                  status={event.status}
                  filter={eventFilter}
                />
              </Grid>
            ))}
          </Fragment>
        ) : (
          <Typography style={{textAlign: "center", margin: "10% auto"}}>
            {eventFilter === "all"
              ? "You do not have any events at the moment"
              : `You do not have any ${eventFilter.toUpperCase()} events`}
          </Typography>
        )}
      </Grid>
    </div>
  )
}

export default withRouter(EventList)
