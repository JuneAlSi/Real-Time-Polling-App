const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  backend: {
    type: String,
    required: true
  },
  points: {
    type: String,
    required: true
  }
})

// Create collections and add schema
const Vote = mongoose.model('Vote', voteSchema)

module.exports = Vote;