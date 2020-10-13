import React from "react"
import {Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import "../../css/home.css"
import {isAuth} from "../auth/Helpers"
const Home = () => {
  return (
    <div className="home-page">
      <p className="text-justify">
        Welcome to the Event Advertiser, The only place where you are guaranteed
        to get the best tickets offers on a vast range of events, including
        sports, conferences, workshops, concerts and more, ...
      </p>
      {isAuth() && isAuth().role === "admin" ? (
        <Button variant="primary" className="links">
          <Link to={`event/admin/${isAuth().id}/all`}>Get Started</Link>
        </Button>
      ) : (
        <Button variant="primary" className="links">
          <Link to="/event/all">Get Started</Link>
        </Button>
      )}
    </div>
  )
}

export default Home
