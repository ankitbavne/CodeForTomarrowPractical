let express = require("express")
let app = express()
app.use(express.json())
require("./helper/db")

let user = require("./routes/user.routes")
let category = require("./routes/category.routes")
let service = require("./routes/services.routes")
let price = require("./routes/price.routes")

app.use("/api/auth", user)
app.use("/api/category", category)
app.use("/api/service", service)
app.use("/api/price", price)

app.listen(3030, () => {
  console.log("server listening")
})
