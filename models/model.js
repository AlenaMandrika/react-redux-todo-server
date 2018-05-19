const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  text: String,
  complete: Boolean
})

module.exports = mongoose.model('Todo', todoSchema)
