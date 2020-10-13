const express = require("express")
const {
  getOneUser,
  bookingEvent,
  updateUserEvent,
  getUserEventIDs
} = require("./user.controllers")
const {getUserEvents} = require("../event/event.controllers")
const router = express.Router()

//user
router.route("/:id").get(getOneUser)
router.route("/event/:id/:filter").get(getUserEventIDs, getUserEvents)

router
  .route("/event/:eventID")
  .post(getUserEventIDs, bookingEvent)
  .put(updateUserEvent)

module.exports = router
