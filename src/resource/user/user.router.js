const express = require("express")
const controllers = require("./user.controllers")
const {getUserEvents} = require("../event/event.controllers")
const router = express.Router()

//user
router.route("/:id").get(controllers.getOneUser)
router
  .route("/event/:id/:filter")
  .get(controllers.getUserEventIDs, getUserEvents)

router
  .route("/event/:eventID")
  .post(controllers.bookingEvent)
  .put(controllers.updateUserEvent)

module.exports = router
