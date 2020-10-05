import {Grid, Typography} from "@material-ui/core"
import React from "react"
import {Button} from "react-bootstrap"

const AdminSideMenu = ({handleEventFiltering, eventFilter}) => {
  return (
    <>
      <Grid item sm={12} lg={3}>
        <Typography variant="body1" as="h2" className={("text-center", "mb-3")}>
          Filter My Events By:
        </Typography>
        <div>
          <Button
            variant={eventFilter === "upcoming" ? "info" : "light"}
            size="sm"
            block
            onClick={() => handleEventFiltering("upcoming")}
          >
            Upcoming
          </Button>
          <Button
            variant={eventFilter === "On Hold" ? "secondary" : "light"}
            size="sm"
            block
            onClick={() => handleEventFiltering("On Hold")}
          >
            On Hold
          </Button>
          <Button
            variant={eventFilter === "canceled" ? "danger" : "light"}
            size="sm"
            block
            onClick={() => handleEventFiltering("canceled")}
          >
            Canceled
          </Button>
          <Button
            variant={eventFilter === "TBC" ? "info" : "light"}
            size="sm"
            block
            onClick={() => handleEventFiltering("TBC")}
          >
            TBC
          </Button>
          <Button
            variant={eventFilter === "all" ? "secondary" : "light"}
            size="sm"
            block
            onClick={() => handleEventFiltering("all")}
            style={{marginBottom: "1rem"}}
          >
            All
          </Button>
        </div>
      </Grid>
    </>
  )
}

export default AdminSideMenu
