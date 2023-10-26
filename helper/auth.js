let jwt = require("jsonwebtoken")

module.exports = {
  verify: async (req, res, next) => {
    let header = req.headers.authorization;
    let token = header.split(' ')[1]
    let isVerified = jwt.verify(token, "codefortomarrow")
    if (isVerified) {
      req["userId"] = isVerified._id;
      next()
    }
    else {
      return res.status(401).json({ message: "unauthorized token" })
    }
  }
}