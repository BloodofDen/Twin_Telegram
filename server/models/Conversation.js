const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
    title: String,
    image: String,
    color: String,
    isPrivate: Boolean,
    createdDate: { type: Date, defaults: Date.now }
})

module.exports = mongoose.model('Conversation', ConversationSchema)