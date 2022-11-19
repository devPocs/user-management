const express = require("express")
const axios = require("axios")
const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    await axios.get("http://localhost:3000/users").then((response) => {
      res.render("index", { users: response.data })
    })
  } catch (error) {
    res.send(error)
  }
})

router.get("/create-newUser", (req, res) => {
  res.render("addUser")
})

router.get("/updateUser", async (req, res) => {
  try {
    await axios
      .get("http://localhost:3000/users", { params: { id: req.query.id } })
      .then((userData) => {
        console.log(userData)
        res.render("updateUser", { user: userData.data })
      })
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
