let router = require("express").Router()
let User = require("../model/user")
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
  try {
    const userData = await User.findOne({
      email: req.body.email
    })
    if (userData) {
      res.status(201).json({
        message: "User exit ",
      })
    } else {
      let data = req.body;
      bcrypt.genSalt(10, async function (err, salt) {
        bcrypt.hash(data.password, salt, async function (err, hash) {
          data["password"] = hash;
          var user = await new User(data).save();
          if (user) {
            res.status(201).json({
              message: "user added successfully",
              data: user
            })
          } else {
            res.status(301).json({
              message: "something went wrong",
            })
          }
        })
      });
    }
  } catch (error) {
    console.log(error)
    res.status(301).json({
      message: "something went wrong",
    })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let findUser = await User.findOne(
      {
        email: email
      });

    if (!findUser) {
      res.status(301).json({
        message: "user not found",
      })
    } else {
      findUser = JSON.parse(JSON.stringify(findUser));
      let matchPasword = await bcrypt.compare(password, findUser.password);
      if (matchPasword) {
        let token = await jwt.sign(findUser, "codefortomarrow", {
          expiresIn: "24h",
        });
        findUser["token"] = `Bearer ${token}`;
        res.status(201).json({
          message: "user login successfully",
          data: findUser
        })
      } else {
        res.status(301).json({
          message: "something went wrong  ",
        })
      }
    }
  } catch (error) {
    console.log(error);
    res.status(301).json({
      message: "something went wrong  ",
    })

  }
});

module.exports = router