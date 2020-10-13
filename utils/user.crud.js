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
  const {eventIDs} = req
  let ids = []
  const {eventID} = req.params
  const {userID} = req.body
  eventIDs.event.map((event) => ids.push(event.eventID))
  console.log(ids, eventID)
  if (ids.toString().includes(eventID.toString())) {
    return res.status(402).json({
      message: "Already registered"
    })
  }

  model
    .findByIdAndUpdate(userID, {$push: {event: {eventID}}}, {new: true})
    .exec((err, events) => {
      if (err || !events) {
        return res.status(400).json({
          message: "event does not exist"
        })
      }
      return res.status(200).json({message: "registration succeful"})
    })
}

const getUserEventIDs = (model) => async (req, res, next) => {
  const id = req.params.id || req.body.userID
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

const getAllEvents = (model) => async (req, res) => {
  const {eventIDs} = req

  try {
    const events = await model.find({status: "upcoming"}).lean().exec()
    res.status(200).json(events)
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

const updateUserEvent = (model) => (req, res) => {
  const {eventID} = req.params
  const {userID} = req.body

  model
    .findOneAndUpdate(
      {_id: userID, "event.$.eventID": eventID},
      {$set: {"event.$.status": "TBC"}},
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
