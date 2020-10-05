import React from "react"
import {Switch, Route} from "react-router-dom"
import CustomerCarousel from "./components/core/Carousel"
import Details from "./components/event/Details"
import Update from "./components/event/Update"
import CreateEventForm from "./components/event/Create"
import Signin from "./components/auth/Signin"
import Signup from "./components/auth/Signup"
import EventList from "./components/event/List"
import AdminHomePage from "./components/admin/Home"
import RegistrationForm from "./components/event/Registration"
import Home from "./components/core/Home"

const Router = () => {
  return (
    <>
      <CustomerCarousel />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/event/all" component={EventList} />
        <Route path="/event/admin/:id/:filter" component={AdminHomePage} />
        <Route
          path="/event/get/:user/:filter"
          render={(props) => (
            <EventList
              user={props.match.params.user}
              filter={props.match.params.filter}
            />
          )}
        />
        <Route path="/event/create" component={CreateEventForm} />
        <Route
          path="/event/register/:eventID"
          render={(props) => (
            <RegistrationForm eventID={props.match.params.eventID} />
          )}
        />
        <Route
          path="/event/:type/:id"
          exact
          render={(props) => <Details id={props.match.params.id} />}
        />
        <Route
          path="/event/update/id/:id"
          exact
          render={(props) => <Update id={props.match.params.id} />}
        />
        {/* <Route path="*" exact component={PageNotFound} /> */}
      </Switch>
    </>
  )
}

export default Router
