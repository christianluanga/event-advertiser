const express = require("express")
const {urlencoded, json} = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require("cors")
require("./utils/db")
const {protect, signin, signup} = require("./utils/auth")
const eventRouter = require("./src/resource/event/event.router")
const userRouter = require("./src/resource/user/user.router")
const {
  getEventsForNonAuthUsers,
  getOneEvent
} = require("./src/resource/event/event.controllers")
const app = express()
app.use(urlencoded({extended: true}))
app.use(json())
app.use(cors())
app.use(morgan("dev"))
dotenv.config()

app.post("/signup", signup)
app.post("/signin", signin)
app.get("/event/all", getEventsForNonAuthUsers)
app.get("/event/details/:id", getOneEvent)
app.use("/api", protect)
app.use("/api/event", eventRouter)
app.use("/api/user", userRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`)
})
