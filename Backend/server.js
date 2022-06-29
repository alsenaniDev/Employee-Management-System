const express = require("express")
const cors = require("cors")
const db = require("./dbConnection")
const app = express()
app.use(express.json())
app.use(cors())
port = 3080
require("dotenv").config()

const groupsRouter = require("./routers/groupRouters")
const rolesRouter = require("./routers/roleRouters")
const userInfoRouter = require("./routers/usersInfoRoutes")
const loginRouters = require("./routers/loginRouters")
const profileRouters = require("./routers/profileRouters")
const serviceRouter = require("./routers/serviceRouters")

app.use("/api/groups", groupsRouter)
app.use("/api/roles", rolesRouter)
app.use("/api/users", userInfoRouter)
app.use("/api/login", loginRouters)
app.use("/api/profile", profileRouters)
app.use("/api/services", serviceRouter)

app.get("/", (req, res) => {
  res.send("App Works !!!!")
})

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})
