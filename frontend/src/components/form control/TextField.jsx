import React from "react"

const FormControlInputText = ({id, type, name, value, placeholder, formik}) => {
  return (
    <input
      type={type}
      className="form-control"
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={formik.handleChange}
      value={value}
    />
  )
}

export default FormControlInputText
