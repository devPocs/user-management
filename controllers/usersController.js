const express = require("express")
const User = require("./../model/usersModel")
const Users = require("./../model/usersModel")

const checkEmail = async (email) => {
  let check = await User.findOne({ email: email })
  var checkRes
  if (check !== null) {
    checkRes = "true"
  } else {
    checkRes = "false"
  }
  return checkRes
}

exports.getUsers = async (req, res, next) => {
  const id = req.query.id

  if (!id) {
    const users = await Users.find()
    res.send(users)
  } else {
    const user = await User.findById(id)
    console.log(user)
    res.send(user)
  }
  next()
}

exports.createNewUser = async (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const gender = req.body.gender
  const status = req.body.status

  if (!name || !email || !gender || !status) {
    res.status(400).send("You have not entered all the details.")
  } else {
    if ((await checkEmail(email)) == "true") {
      res.status(400).json({ message: "email already exists" })
    } else {
      const newUser = await User.create({
        name: name,
        email: email,
        gender: gender,
        status: status,
      })
      res.status(200).json({ message: "saved successfully!" })
    }
  }

  next()
}
exports.updateUser = async (req, res, next) => {
  const id = req.body.id

  if (id) {
    if (!req.body) {
      res.status(400).send("We have no details to update!")
    } else if (!req.body.name || !req.body.email) {
      res.status(400).send("Pls, complete the form")
    } else {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      })
      res.status(200).send("Details successfully updated!")
    }
  } else {
    res.status(400).send("User probably doesn't exist")
  }

  next()
}
exports.deleteUser = async (req, res, next) => {
  const id = req.query.id
  const user = await User.findById(id)
  if (user) {
    await User.deleteOne(user)
    res.json({ message: "User deleted successfully!" })
  } else {
    res.json({ message: "User doesn't exist!" })
  }
}
