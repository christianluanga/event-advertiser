import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}))

const CustomerButton = ({
  variant,
  color,
  btnText,
  href,
  handleEventFiltering,
  filter
}) => {
  const classes = useStyles()

  return (
    <div>
      {href ? (
        <Button
          variant={variant}
          color={color}
          href={href}
          onClick={() => handleEventFiltering({filter})}
        >
          {btnText}
        </Button>
      ) : (
        <Button variant={variant} color={color}>
          {btnText}
        </Button>
      )}
    </div>
  )
}

CustomerButton.defaultProps = {
  color: "default"
}
export default CustomerButton
