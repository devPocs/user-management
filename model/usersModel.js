const express = require("express")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  gender: { type: String, required: true },
  status: { type: String, required: true },
})

const User = mongoose.model("users", userSchema)

module.exports = User
