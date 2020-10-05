const crypto = require("crypto")

/**@param password plain-text passowrd to be hashed
 * @returns hashed password
 */
module.exports = function (password) {
  if (!password) return ""
  try {
    return crypto
      .createHmac("sha1", process.env.HASH_KEY)
      .update(password)
      .digest("hex")
  } catch (err) {
    return ""
  }
}
