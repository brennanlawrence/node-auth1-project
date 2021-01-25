const express = require("express");
const router = express.Router();
const Users = require("./users-model");

const bcrypt = require("bcryptjs");
const session = require("express-session");
const uuid = require("uuid");
const server = require("../server");

let sessionConfig = {
  name: "user",
  secret: "mind you own business",
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false,
  },
  httpOnly: true,
  resave: false,
  saveUninitialized: false,
};


router.use(
  session(sessionConfig)
);

router.post("/register", (req, res, next) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  Users.insert(credentials)
    .then((credentials) => {
      res.status(201).json({ message: "Successfully created user." });
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {
  let { user_name, password } = req.body;

  Users.findBy(user_name)
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;

        res.status(201).json({ message: `Welcome ${user.user_name}!` });
      } else {
        res.status(401).json({ message: "You shall not pass" });
      }
    })
    .catch(next);
});

router.get("/users", (req, res, next) => {
  if (req.session && req.session.user) {
    Users.findBy()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
  } else {
    res.status(401).json({ message: "You shall not pass" });
  }
  
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = router;
