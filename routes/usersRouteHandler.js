const express = require("express")
const {
  getUsers,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController")
const router = express.Router()

//

router.get("/", getUsers)
router.post("/new-user", createNewUser)
router.patch("/", updateUser)
router.delete("/delete", deleteUser)

module.exports = router
