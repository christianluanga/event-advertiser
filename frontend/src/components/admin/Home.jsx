import React from "react"
import {Link} from "react-router-dom"
import "../../css/admin.event.css"

const AdminHomePage = ({id}) => {
  const _id = "5f6f97ae989b603c207e9d38"
  return (
    <div className="main">
      <div className="grid">
        <div className="card">
          <Link to={`/event/get/${_id}/upcoming`}>
            <h3>My upcoming events</h3>
          </Link>
          <p>This is the list of all upcoming events created by you</p>
        </div>
        <div className="card">
          <Link to={`/event/get/${_id}/all`}>
            <h3>All My Events</h3>
          </Link>
          <p>This is the list of all events you created</p>
        </div>
        <div className="card">
          <Link to={`/event/get/all/upcoming`}>
            <h3>All upcoming Events</h3>
          </Link>
          <p>This is the list of all upcoming events in the system</p>
        </div>
        <div className="card">
          <Link to={`/event/get/all/all`}>
            <h3>All Events</h3>
          </Link>
          <p>This is the list of all events in the system</p>
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage
