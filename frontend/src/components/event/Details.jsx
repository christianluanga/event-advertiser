import React, {useState, useEffect} from "react"
import axios from "axios"
import {makeStyles, Grid} from "@material-ui/core"
import Agenda from "./Agenda"
import {withRouter} from "react-router-dom"
import {getCookie, isAuth} from "../auth/Helpers"
import {defaultUrl} from "../helpers/defaultImageUrl"
import {Button} from "react-bootstrap"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}))
const Details = ({id, history}) => {
  const classes = useStyles()
  const [event, setEvent] = useState([])
  const [eventLoaded, setEventLoaded] = useState(false)
  const URL = isAuth() ? `/api/event/${id}` : `/event/details/${id}`
  useEffect(() => {
    axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        setEvent(response.data)
        setEventLoaded(true)
      })
      .catch((err) => {
        console.error(err)
        setEventLoaded(true)
      })
  }, [id, URL])
  return (
    <div className={(classes.root, "border border-default", "my-3")}>
      {eventLoaded ? (
        <>
          <Grid container spacing={3} className="p-2 ">
            <Grid item sm={12} lg={6}>
              <img
                style={{height: "100%", width: "100%", borderRadius: "5px"}}
                src={
                  event.details.imageUrl !== ""
                    ? event.details.imageUrl
                    : defaultUrl
                }
                alt=""
              />
            </Grid>
            <Grid item sm={12} lg={6}>
              <Agenda event={event} />
              <Button
                variant="secondary"
                size="sm"
                className="m-3"
                onClick={() => {
                  isAuth()
                    ? history.push(`/event/get/${isAuth().id}/all`)
                    : history.push(`/event/all`)
                }}
              >
                Back To The Events Page
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  )
}

export default withRouter(Details)
