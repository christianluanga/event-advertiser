const mongoose = require("mongoose")

const Schema = mongoose.Schema

const eventSchema = new Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    default: "upcoming"
  },
  details: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    host: {
      type: String,
      default: "TBC"
    },
    imageUrl: String
  },
  venue: {
    name: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    country: String,
    city: String
  },
  speakers: [
    {
      name: {
        type: String,
        default: "TBC"
      },
      slots: [
        {
          time: String,
          topic: String
        }
      ],
      picture: String
    }
  ]
})

module.exports = mongoose.model("Event", eventSchema)
