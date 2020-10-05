const {crudControllers} = require("../../../utils/user.crud")
const User = require("./user.model")

module.exports = crudControllers(User)
