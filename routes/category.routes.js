let router = require("express").Router()
let Category = require("../model/category")
let auth = require("../helper/auth")
router.post("/addCategory", auth.verify, async (req, res) => {
  try {
    let userId = req.userId
    let obj = {
      ...req.body,
      adminId: userId
    }
    let result = await new Category(obj).save()
    res.status(201).json({
      message: "category added successfully",
      data: result
    })

  } catch (error) {
    res.status(301).json({
      message: "something went wrong",
    })
  }
})
router.get("/getCategory", auth.verify, async (req, res) => {
  try {

    let result = await Category.find({})
    res.status(201).json({
      message: "category fetch successfully",
      data: result
    })
  } catch (error) {
    res.status(301).json({
      message: "something went wrong",
    })
  }
})

router.put("/updateCategory/:id", auth.verify, async (req, res) => {
  try {
    let id = req.params.id
    let result = await Category.findByIdAndUpdate({ _id: id },
      { $set: req.body }, { new: true })
    res.status(201).json({
      message: "category upadted successfully",
      data: result
    })
  } catch (error) {
    res.status(301).json({
      message: "something went wrong",
    });
  }
})

router.delete("/deleteCategory/:id", auth.verify, async (req, res) => {
  try {
    let result = await Category.findOneAndDelete({ _id: req.params.id })
    res.status(201).json({
      message: "category deleted successfully",
    })
  } catch (error) {
    res.status(301).json({
      message: "something went wrong",
    })
  }
})


module.exports = router