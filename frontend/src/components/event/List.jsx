import React, {useState, useEffect, Fragment} from "react"
import axios from "axios"
import {makeStyles, Grid, Typography, Divider} from "@material-ui/core"
import EventCard from "../core/EventCard"
import {getCookie, isAuth} from "../auth/Helpers"
import {withRouter} from "react-router-dom"
import UserSideMenu from "../core/SideMenu"
import AdminSideMenu from "../admin/SideMenu"
import {Button} from "react-bootstrap"

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
    URL = `/api/user/event/${user}/${filter}`
  } else if (isAuth() && isAuth().role === "admin") {
    URL = `/api/event/admin/${user}/${filter}`
  }
  if (filter === "more") URL = "/event/all"

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
        console.log(data)
        setEvents(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleEventFiltering = (status) => {
    setEventFilter(status)

    history.push(`/event/get/${user}/${status}`)
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
          events.map((event, index) => (
            <Grid item sm={12} lg={3} key={index}>
              <EventCard
                id={event._id}
                details={event.details}
                status={event.status}
                filter={eventFilter}
              />
            </Grid>
          ))
        ) : (
          <Typography style={{textAlign: "center", margin: "10% auto"}}>
            {eventFilter === "all" ? (
              <>
                <p>
                  You have not registered for any events yet. Visit the events
                  page to get started
                </p>
                <Button
                  onClick={() => handleEventFiltering("more")}
                  variant="primary"
                >
                  Go To The Events Page
                </Button>
              </>
            ) : (
              `You do not have any ${eventFilter} events at the moment`
            )}
          </Typography>
        )}
      </Grid>
    </div>
  )
}

export default withRouter(EventList)
