const {model} = require("../src/resource/user/user.model")
const encryptPassword = require("../utils/hash")

const createUser = (model) => async (req, res) => {
  const {password} = req.body
  try {
    const user = await model.create({
      password: encryptPassword(password),
      ...req.body
    })
    res.status(201).json(user)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const updateOneUser = (model) => async (req, res) => {
  const updatedUsertDetails = req.body
  try {
    const updatedUser = await model
      .findByIdAndUpdate(req.params.id, updatedUsertDetails, {new: true})
      .lean()
      .exec()
    res.status(200).json(updatedUser)
  } catch (err) {
    console.err(err)
    res.status(400).end()
  }
}

const getOneUser = (model) => async (req, res) => {
  try {
    const user = await model.findById(req.params.id).lean().exec()
    res.status(200).json(user)
  } catch (err) {
    console.err(err)
    res.status(400).end()
  }
}

const deleteOneUser = (model) => async (req, res) => {
  try {
    const removed = await model.findByIdAndRemove(req.params.id).lean().exec()
    res.status(200).json(removed)
  } catch (err) {
    console.err(err)
    res.status(400).end()
  }
}

const bookingEvent = (model) => async (req, res) => {
  const {eventID} = req.params
  const {userID} = req.body
  console.log(eventID)
  model
    .findByIdAndUpdate(userID, {$push: {event: {eventID}}}, {new: true})
    .exec((err, events) => {
      if (err || !events) {
        return res.status(400).json({
          error: "event does not exist"
        })
      }
      return res
        .status(200)
        .json({message: `event successfully updated`, events})
    })
}

const getUserEventIDs = (model) => async (req, res, next) => {
  const {id} = req.params
  model.findById(id).exec((err, eventIDs) => {
    if (err || !eventIDs) {
      return res.status(400).json({
        error: "user does not exist"
      })
    }
    req.eventIDs = eventIDs
    next()
  })
}

const updateUserEvent = (model) => (req, res) => {
  const {eventID} = req.params
  const {userID} = req.body
  console.log(eventID, userID)
  model
    .updateOne(
      {_id: userID, "event.eventID": eventID},
      {$set: {"event.$.status": "canceled"}},
      {new: true}
    )
    .exec((err, event) => {
      if (err || !event) {
        return res.status(400).json({
          error: "event does not exist"
        })
      }
      return res
        .status(200)
        .json({message: `event successfully updated`, event})
    })
}

exports.crudControllers = (model) => ({
  createUser: createUser(model),
  getOneUser: getOneUser(model),
  deleteOneUser: deleteOneUser(model),
  updateOneUser: updateOneUser(model),
  bookingEvent: bookingEvent(model),
  getUserEventIDs: getUserEventIDs(model),
  updateUserEvent: updateUserEvent(model)
})
