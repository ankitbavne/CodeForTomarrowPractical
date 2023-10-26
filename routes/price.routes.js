let router = require("express").Router()
let price = require("../model/price")
let auth = require("../helper/auth")
router.post("/addprice", auth.verify, async (req, res) => {
  try {
    let userId = req.userId
    let obj = {
      ...req.body,
      adminId: userId
    }
    let result = await new price(obj).save()
    res.status(201).json({
      message: "price added successfully",
      data: result
    })

  } catch (error) {
    res.status(301).json({
      message: "something went wrong",
    })
  }
})

router.put("/updatePrice/:id", auth.verify, async (req, res) => {
  try {
    let id = req.params.id
    let result = await price.findByIdAndUpdate({ _id: id },
      { $set: req.body }, { new: true })
    res.status(201).json({
      message: "price upadted successfully",
      data: result
    })
  } catch (error) {
    res.status(301).json({
      message: "something went wrong",
    });
  }
})

router.delete("/deletePrice/:id", auth.verify, async (req, res) => {
  try {
    let result = await price.findOneAndDelete({ _id: req.params.id })
    res.status(201).json({
      message: "price deleted successfully",
    })
  } catch (error) {
    res.status(301).json({
      message: "something went wrong",
    })
  }
})


module.exports = router