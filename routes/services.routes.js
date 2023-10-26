let router = require("express").Router()
let service = require("../model/service")
let auth = require("../helper/auth")
router.post("/Service", auth.verify, async (req, res) => {
  try {
    let userId = req.userId
    let obj = {
      ...req.body,
      adminId: userId
    }
    let result = await new service(obj).save()
    res.status(201).json({
      message: "service added successfully",
      data: result
    })

  } catch (error) {
    res.status(301).json({
      message: "something went wrong",
    })
  }
})
router.get("/getService/categoryId", auth.verify, async (req, res) => {
  try {

    let result = await service.find({ categoryId: req.body.categoryId }).populate("categoryId")
    res.status(201).json({
      message: "service fetch successfully",
      data: result
    })
  } catch (error) {
    res.status(301).json({
      message: "something went wrong",
    })
  }
})

router.put("/updateService/:id", auth.verify, async (req, res) => {
  try {
    let id = req.params.id
    let result = await service.findByIdAndUpdate({ _id: id },
      { $set: req.body }, { new: true })
    res.status(201).json({
      message: "service upadted successfully",
      data: result
    })
  } catch (error) {
    res.status(301).json({
      message: "something went wrong",
    });
  }
})

router.delete("/deleteService/:id", auth.verify, async (req, res) => {
  try {
    let result = await service.findOneAndDelete({ _id: req.params.id })
    res.status(201).json({
      message: "service deleted successfully",
    })
  } catch (error) {
    res.status(301).json({
      message: "something went wrong",
    })
  }
})


module.exports = router