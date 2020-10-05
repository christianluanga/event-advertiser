import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Divider from "@material-ui/core/Divider"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}))

export default function Agenda({event}) {
  const classes = useStyles()

  return (
    <List className={classes.root}>
      {event.speakers.map((speaker, index) =>
        speaker.name !== "" ? (
          <div key={index}>
            <ListItem
              key={speaker.name}
              alignItems="flex-start"
              className="w-100"
            >
              <ListItemAvatar>
                <Avatar alt={speaker.name} src="" />
              </ListItemAvatar>
              <ListItemText
                primary={speaker.name}
                secondary={
                  <ol style={{listStyle: "none"}}>
                    {speaker.slots.map((slot, index) => (
                      <li className="mb-2" key={index}>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {slot.time}
                        </Typography>
                        {"   -   " + slot.topic}
                      </li>
                    ))}
                  </ol>
                }
              />
            </ListItem>
            <Divider variant="inset" component="hr" />
          </div>
        ) : null
      )}
    </List>
  )
}
