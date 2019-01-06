const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String,
    timeStamp: String
})

module.exports = mongoose.model('Message', MessageSchema)