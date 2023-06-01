
const express = require("express");
const router = express.Router()
const User = require("../models/users")

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body)
    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
})

router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    return res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
})

router.get("/userList", async function (req, res, next) {
  try {
    const user = await User.getUsers()
    return res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
})
module.exports = router