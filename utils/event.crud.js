const createEvent = (model) => async (req, res) => {
  try {
    const event = await model.create(req.body)
    res.status(201).json(event)
  } catch (err) {
    console.error(err)
    res.status(400).send({message: err._message})
  }
}

const getAdminEvents = (model) => async (req, res) => {
  let query = {}
  const {id, filter} = req.params
  if (id !== "all" && filter !== "all") {
    //all filtered event by id e.g 1/upcoming
    query.createdBy = id
    query.status = filter
  } else if (id !== "all") {
    //all event by id 1/all
    query.createdBy = id
  } else if (filter !== "all") {
    //all filtered events e.g upcoming
    query.status = filter
  }
  try {
    const events = await model.find(query).lean().exec()
    res.status(200).json(events)
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

const getUserEvents = (model) => async (req, res) => {
  const {eventIDs} = req
  const {filter} = req.params
  let ids = []

  eventIDs.event.map((event) => ids.push(event.eventID))
  let query = {
    $and: [{_id: {$in: ids}}]
  }
  if (filter === "all") {
    query = {
      $and: [{_id: {$nin: ids}}]
    }
  }

  try {
    const events = await model.find(query).sort({status: -1}).lean().exec()
    res.status(200).json(events)
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}
const getEventsForNonAuthUsers = (model) => async (req, res) => {
  try {
    const events = await model.find({status: "upcoming"}).lean().exec()
    res.status(200).json(events)
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}
const updateOneEvent = (model) => async (req, res) => {
  const updatedEventDetails = req.body
  try {
    const updatedEvent = await model
      .findByIdAndUpdate(req.params.id, updatedEventDetails, {new: true})
      .lean()
      .exec()
    res.status(200).json(updatedEvent)
  } catch (err) {
    console.err(err)
    res.status(400).end()
  }
}

const getOneEvent = (model) => async (req, res) => {
  try {
    const event = await model.findById(req.params.id).lean().exec()
    res.status(200).json(event)
  } catch (err) {
    console.err(err)
    res.status(400).end()
  }
}

const deleteOneEvent = (model) => async (req, res) => {
  try {
    const removed = await model.findByIdAndRemove(req.params.id).lean().exec()
    res.status(200).json(removed)
  } catch (err) {
    console.err(err)
    res.status(400).end()
  }
}

exports.crudControllers = (model) => ({
  createEvent: createEvent(model),
  getAdminEvents: getAdminEvents(model),
  getUserEvents: getUserEvents(model),
  getOneEvent: getOneEvent(model),
  deleteOneEvent: deleteOneEvent(model),
  updateOneEvent: updateOneEvent(model),
  getEventsForNonAuthUsers: getEventsForNonAuthUsers(model)
})
