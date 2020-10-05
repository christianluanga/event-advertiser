const mongoose = require("mongoose")
const encryptPassword = require("../../../utils/hash")
const Schema = mongoose.Schema

// User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false
    },
    email: {
      type: String,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "user",
      required: false
    },
    event: [
      {
        eventID: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Event"
        },
        status: {
          type: String,
          default: "upcoming"
        }
      }
    ]
  },
  {timestamps: true}
)

// Auto Populate Users
const autoPopulateEvent = function (next) {
  this.populate("Event", "_id event")
  next()
}

userSchema.pre("findOne", autoPopulateEvent)

// Methods
userSchema.methods = {
  authenticate: function (plainText) {
    return encryptPassword(plainText) === this.password // true || false
  }
}

module.exports = mongoose.model("User", userSchema)
