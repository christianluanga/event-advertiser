const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()
const uri = process.env.MONGO_URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on("error", () => {
  console.log("Could not connect to mongo exiting now ...")
  process.exit()
})

mongoose.connection.once("open", () => {
  console.log("DB connection successful")
})
