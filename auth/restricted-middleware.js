const jwToken = require("jsonwebtoken");

const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwToken.verify(token, secrets.jsonWebTokenSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Hey what do you think your doing" });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res
      .status(400)
      .json({ message: "you need a token to get in this awesome app" });
  }
};
