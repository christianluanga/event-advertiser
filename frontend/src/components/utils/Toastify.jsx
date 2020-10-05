import React from "react"
import {ToastContainer} from "react-toastify"

const Toastify = ({duration}) => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={duration}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

Toastify.defaultProps = {
  duration: 5000
}

export default Toastify
