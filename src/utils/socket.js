import openSocket from 'socket.io-client'

const HOST_URL = 'http://localhost:5000'
const socket = openSocket(HOST_URL)

export const subscribeToConversation = conversationId => socket.emit('subscribeToConversation', conversationId)
export const subscribeToConversations = conversationsIds => socket.emit('subscribeToConversations', conversationsIds)
export const acceptNewMessage = handler => socket.on('newMessage', handler)
export const acceptEditMessage = handler => socket.on('editMessage', handler)
export const typingMessage = (userId, userName, conversationId) => socket.emit('typingMessage', {
    userId,
    userName,
    conversationId
})
export const typingMessageHandler = handler => socket.on('typingMessage', handler)