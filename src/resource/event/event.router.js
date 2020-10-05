/**This file contains the all the routes partaining to the event operations.
 * The routes use the functions defined in the event.crud file exported through the controller
 */
const express = require("express")
const {
  getEventsForNonAuthUsers,
  createEvent,
  getAdminEvents,
  getUserEvents,
  getOneEvent,
  deleteOneEvent,
  updateOneEvent
} = require("./event.controllers")
const {getUserEventIDs} = require("../user/user.controllers")
const router = express.Router()

//api/event
router.route("/").get(getEventsForNonAuthUsers).post(createEvent)

router.route("/admin/:id/:filter").get(getAdminEvents)
router.route("/user/:id/:filter").get(getUserEventIDs, getUserEvents)

//api/event/:id
router.route("/:id").get(getOneEvent).delete(deleteOneEvent).put(updateOneEvent)

module.exports = router
