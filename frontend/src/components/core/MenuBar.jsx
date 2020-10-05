import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import {Link, withRouter} from "react-router-dom"
import {isAuth, signout} from "../auth/Helpers"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const MenuBar = ({history}) => {
  const classes = useStyles()
  return (
    <div className={(classes.root, "mb-1")}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={"links"}>
              <Button color="inherit">Event Advertiser</Button>
            </Link>
            {isAuth() && isAuth().role === "admin" ? (
              <>
                <Link to="/event/create" className={"links"}>
                  <Button color="inherit">Create Event</Button>
                </Link>
                <Link to={`/event/get/${isAuth().id}/all`} className={"links"}>
                  <Button color="inherit">View Events</Button>
                </Link>
              </>
            ) : (
              <>
                {isAuth() && isAuth().role === "user" ? (
                  <Link
                    to={`/event/get/${isAuth().id}/all`}
                    className={"links"}
                  >
                    <Button color="inherit">View Events</Button>
                  </Link>
                ) : (
                  <Link to="/event/all" className={"links"}>
                    <Button color="inherit">View Events</Button>
                  </Link>
                )}
              </>
            )}
          </Typography>
          {!isAuth() && (
            <>
              <Link to={"/signin"} className={"links"}>
                <Button color="inherit">{"Login"}</Button>
              </Link>
              <Link to="/signup" className={"links"}>
                <Button color="inherit">Signup</Button>
              </Link>
            </>
          )}
          {isAuth() && (
            <Button
              className="links"
              onClick={() => signout(() => history.push("/signin"))}
            >
              Signout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(MenuBar)
