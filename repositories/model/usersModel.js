const usersSchema = require('../schema/usersSchema')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('config')

usersSchema.pre('save', async function (next) {
    const user = this
    if (!this.isNew && !this.isModified('password')) {
        return next()
    }
    try {
        const salt = await bcrypt.genSalt(config.SALT)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
        next()
    } catch (error) {
        next(error)
    }
})

// Compare password
usersSchema.methods.comparePassword = async function (candidatePassword) {
    const hash = await bcrypt.compare(candidatePassword, this.password)
    return hash
}

module.exports = mongoose.model('user', usersSchema, 'users')