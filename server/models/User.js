const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    image: String,
    color: String,
    createdDate: { type: Date, defaults: Date.now }
})

module.exports = mongoose.model('User', UserSchema)