const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const path = require("path")
const mongoose = require("mongoose")
const cors = require("cors")

const userRoute = require("./routes/usersRouteHandler")
const viewsController = require("./controllers/viewsController")
const app = express()
app.set()

dotenv.config({ path: "./config.env" })
const port = app.set("port", process.env.PORT || 4040)

//database connection
//local connection
mongoose.connect("mongodb://localhost:27017/UserManagementSystemU", (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("database is up and running")
  }
})
//const DB = process.env.DB_CONN.replace("<PASSWORD>", process.env.PASSWORD)

//mongoose
// .connect(DB, {
//   useNewUrlParser: true,
// })
// .then(() => {
//   console.log("Database is up and running!")
// })
// .catch((err) => {
//   console.log(err)
// })

//add the view engine
app.set("view engine", "ejs")

//app middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

//route middlewares
app.use("/", viewsController)
app.use("/users", userRoute)
app.use(express.static(path.join(__dirname, "assets")))

app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`)
})
