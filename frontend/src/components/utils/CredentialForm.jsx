import React from "react"
import {Form, Button} from "react-bootstrap"
import LoadingButton from "./LoadingButton"

const CustomerForm = ({
  handleChange,
  handleSubmit,
  buttonText,
  isLoading,
  credentials
}) => {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange("email")}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      {buttonText === "Signup" ? (
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange("name")}
          />
        </Form.Group>
      ) : null}
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange("password")}
        />
      </Form.Group>
      {credentials && (
        <Form.Text className="text-danger">Wrong email and password</Form.Text>
      )}

      {!isLoading ? (
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {buttonText}
        </Button>
      ) : (
        <LoadingButton
          buttonText={
            buttonText.includes("up") ? "Saving your details" : "Signing in"
          }
        />
      )}
    </Form>
  )
}

export default CustomerForm
