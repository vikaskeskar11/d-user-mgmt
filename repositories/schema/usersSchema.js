const Schema = require('mongoose').Schema

module.exports = new Schema({
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, required: true }
})