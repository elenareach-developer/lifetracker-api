
const express = require("express");
const router = express.Router()
const Nutrition = require("../models/nutrition")

router.post("/add", async function (req, res, next) {
  try {
    const nutrition = await Nutrition.create(req.body)
    return res.status(200).json({ nutrition })
  } catch (err) {
    next(err)
  }
})

router.get("/find/:id", async function (req, res, next) {
    if(!req.params){ throw err}

  try {
    const nutrition = await Nutrition.fetchByUserId({user_id:req.params})
    return res.status(201).json({ nutrition })
  } catch (err) {
    next(err)
  }
})
router.post("/list/", async function (req, res, next) {
  console.log("req.body");
  console.log(req.body);
    try {
      const nutrition = await Nutrition.list(req.body)
      console.log("nutrition route")
      console.log(nutrition)
      return res.status(201).json({ nutrition })
    } catch (err) {
      next(err)
    }
  })

module.exports = router