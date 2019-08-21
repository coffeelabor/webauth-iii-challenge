const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwToken = require("jsonwebtoken");

const users = require("../users/users-model.js");
const secrets = require("../config/secrets.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  users
    .add(user)
    .then(hashed => {
      res.status(201).json(hashed);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  users
    .findBy({ username })
    // .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getWebToken(user);

        res.status(200).json({
          message: `Howdy ${user.username}`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Creds" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

function getWebToken(user) {
  const payload = {
    subject: users.id,
    username: user.username,
    jwtid: 1
  };
  const options = {
    expiresIn: "2d"
  };
  return jwToken.sign(payload, secrets.jsonWebTokenSecret, options);
}

module.exports = router;
