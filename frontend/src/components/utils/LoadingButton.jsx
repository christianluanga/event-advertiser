import React from "react"
import {Button, Spinner} from "react-bootstrap"

const LoadingButton = ({buttonText}) => {
  return (
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      {buttonText}...
    </Button>
  )
}

export default LoadingButton
