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
    timeStamp: String,
    wasEdited: { type: Boolean, default: false },
    editionTimeStamp: String,
    wasDeletedLocally: { type: Boolean, default: false },
    wasDeletedGlobally: { type: Boolean, default: false }
})

module.exports = mongoose.model('Message', MessageSchema)