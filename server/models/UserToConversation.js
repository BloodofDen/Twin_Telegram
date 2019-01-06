const mongoose = require('mongoose')//.set('debug', true)

const UserToConversationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    unreadMessagesCount: { type: Number, default: 0 }
})

module.exports = mongoose.model('UserToConversation', UserToConversationSchema)