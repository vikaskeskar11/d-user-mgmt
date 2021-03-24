const Schema = require('mongoose').Schema

module.exports = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, required: true },
    markDelete: { type: Boolean, default: false }
})