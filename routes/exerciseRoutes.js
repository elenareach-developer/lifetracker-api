
const express = require("express");
const router = express.Router()
const Exercise = require("../models/exercise")

router.post("/add", async function (req, res, next) {
  try {
    const exercise = await Exercise.create(req.body)
    return res.status(200).json({ exercise })
  } catch (err) {
    next(err)
  }
})

router.get("/find/:id", async function (req, res, next) {
    if(!req.params){ throw err}

  try {
    const exercise = await Exercise.fetchByUserId({user_id:req.params})
    return res.status(201).json({ exercise })
  } catch (err) {
    next(err)
  }
})
router.post("/list/", async function (req, res, next) {
  console.log("req.body");
  console.log(req.body);
    try {
      const exercise = await Exercise.list(req.body)
      console.log("exercise route")
      console.log(exercise)
      return res.status(201).json({ exercise })
    } catch (err) {
      next(err)
    }
  })

module.exports = router