/**This file contains the all the cruds operations partaining to the event model.
 * Those crud operations are defined in a separate file (event.crud.js) sn then imported.
 */
const {crudControllers} = require("../../../utils/event.crud")
const Event = require("./event.model")

module.exports = crudControllers(Event)
