const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const models = require("../../models/index");
const auth = require("../../middleware/getToken");
const User = models.User;

/* const models = require("../../models/index");
 const Trip = require("../../models/trip"); doesn't work, dunno why
 const Trip = models.Trip; 
 */
router.get("/", auth, (req, res) => {
  console.log("passed to last fun");
  res.json({ msg: " OK" });
});

router.post("/register", (req, res) => {
  console.log("!");
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.json({ msg: "All fields required" });
  }
  User.findOne({ where: { email: email } }).then(user => {
    if (user) {
      //res.status(400);
      return res.json({ msg: "Email already taken" });
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) throw err;
        const newUser = { fullname, password: hashedPassword, email };
        User.create(newUser)
          .then(user => {
            const userSign = {
              fullname: user.fullname,
              email: user.email,
              id: user.id
            };
            jwt.sign(
              { userSign },
              "bigSecret",
              { expiresIn: 3600 },
              (err, token) => {
                if (err) {
                  return res.json({ msg: "Something went wrong" });
                }
                return res.json({
                  user: { ...userSign },
                  token
                });
              }
            );
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ msg: "Enter all fields" });
  }
  User.findOne({ where: { email: email } }).then(user => {
    if (!user) {
      return res.json({ msg: "Invalid username or password" });
    }
    bcrypt.compare(password, user.password).then(success => {
      if (!success) {
        return res.json({ msg: "Invalid username or password" });
      }
      const userSign = {
        fullname: user.fullname,
        email: user.email,
        id: user.id
      };
      jwt.sign(userSign, "bigSecret", { expiresIn: 3600 }, (err, token) => {
        if (err) return res.json({ err, msg: "Something went wrong" });
        if (!token) {
          return res.json({ msg: "Something went wrong" });
        }
        return res.json({
          user: { ...userSign },
          token
        });
      });
    });
  });
});

module.exports = router;
