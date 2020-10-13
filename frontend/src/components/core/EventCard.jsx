import React from "react"
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import axios from "axios"
import {makeStyles} from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import {Link} from "react-router-dom"
import {getCookie, isAuth} from "../auth/Helpers"
import {defaultUrl} from "../helpers/defaultImageUrl"
import Toastify from "../utils/Toastify"
import {useState} from "react"
import LoadingButton from "../utils/LoadingButton"

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
})

const EventCard = ({id, details, status, filter}) => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const handleDelete = () => {
    axios({
      method: "delete",
      url: `/api/event/${id}`,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  const handleCancelation = async () => {
    setIsLoading(true)
    axios({
      method: "put",
      url: `/api/user/event/${id}`,
      data: {userID: isAuth().id},
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        toast.success("Event Successfully canceled")
        setIsLoading(false)
      })
      .catch((err) => {
        toast.error(`Cancelation failed due to ${err.message}`)
        setIsLoading(false)
        console.error(err.message)
      })
  }
  return (
    <div>
      <Toastify duration={3000} />
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={details.imageUrl !== "" ? details.imageUrl : defaultUrl}
            title={details.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {details.title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h5">
              {status ? status : "TBC"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {isAuth() && isAuth().role === "admin" ? (
            <>
              <Button
                className="links mr-3 mb-1"
                size="medium"
                variant="contained"
                color="primary"
              >
                <Link to={`/event/update/id/${id}`} className="links">
                  Update
                </Link>
              </Button>
              <Button
                className="mb-2"
                size="medium"
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              {isAuth() && isAuth().role === "user" && filter !== "more" ? (
                <>
                  {isLoading ? (
                    <LoadingButton buttonText=" Canceling " />
                  ) : (
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      disabled={status !== "upcoming" ? true : false}
                      onClick={() => handleCancelation(id)}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button size="small" color="primary" variant="outlined">
                    <Link to={`/event/${details.category}/${id}`}>
                      Learn More
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="small"
                    disabled={isAuth() ? false : true}
                    color="primary"
                  >
                    <Link to={`/event/register/${id}`} details={details}>
                      Register Now
                    </Link>
                  </Button>
                  <Button size="small" color="primary" variant="outlined">
                    <Link to={`/event/${details.category}/${id}`}>
                      Learn More
                    </Link>
                  </Button>
                </>
              )}
            </>
          )}
        </CardActions>
      </Card>
    </div>
  )
}

export default EventCard
