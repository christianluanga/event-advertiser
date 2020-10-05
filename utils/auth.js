const User = require("../src/resource/user/user.model")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const encryptPassword = require("./hash")

dotenv.config()

const newToken = (role, name, id) => {
  return jwt.sign({role, name, id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPERIRES_IN
  })
}

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

const signup = async (req, res) => {
  const {email, password, role, name} = req.body
  User.findOne({email}).exec((err, user) => {
    if (err) {
      return res.json({err})
    }
    if (user) {
      return res.status(400).json({message: "Email already registered"})
    }

    const newUser = new User({
      password: encryptPassword(password),
      role,
      name,
      email
    })
    newUser.save()

    return res.status(201).json({
      message: "success"
    })
  })
}

const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({message: "need email and password"})
  }

  const invalid = {message: "Invalid email and passoword combination"}

  try {
    const user = await User.findOne({email: req.body.email}).exec()

    if (!user) {
      return res.status(401).send(invalid)
    }

    const match = (await user.password) === encryptPassword(req.body.password)

    if (!match) {
      return res.status(401).send(invalid)
    }

    const {role, name, id} = user
    const token = newToken(role, name, id)
    return res.status(200).json({token, user: {role, name, id}})
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end()
  }

  const token = bearer.split("Bearer ")[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  const user = await User.findById(payload.id).select("-password").lean().exec()

  if (!user) {
    return res.status(401).end()
  }

  req.user = user
  next()
}
module.exports = {protect, signin, signup}
