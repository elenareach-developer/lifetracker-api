
const express = require("express");
const router = express.Router()
const Sleep = require("../models/sleep")

router.post("/add", async function (req, res, next) {
  try {
    const sleep = await Sleep.create(req.body)
    return res.status(200).json({ sleep })
  } catch (err) {
    next(err)
  }
})

router.get("/find/:id", async function (req, res, next) {
    if(!req.params){ throw err}

  try {
    const sleep = await Sleep.fetchByUserId({user_id:req.params})
    return res.status(201).json({ sleep })
  } catch (err) {
    next(err)
  }
})
router.post("/list/", async function (req, res, next) {
  console.log("req.body");
  console.log(req.body);
    try {
      const sleep = await Sleep.list(req.body)
      console.log("sleep route")
      console.log(sleep)
      return res.status(201).json({ sleep })
    } catch (err) {
      next(err)
    }
  })

module.exports = router