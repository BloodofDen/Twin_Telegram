import cloneDeep from 'lodash.clonedeep'

const initialState = {
    messages: [],
    companions: [],
    isShowSpinner: false
}

export default (state = initialState, { type, conversation, messageData, messageUpdateData, updatedMessageData, editedMessageData, messageId }) => {
    switch (type) {
        case 'SET_CONVERSATION':
            return {
                ...cloneDeep(conversation),
                messages: conversation.messages || [],
                isShowSpinner: false
            }
        case 'ADD_CONVERSATION':
            return {
                ...cloneDeep(conversation),
                messages: [],
                isShowSpinner: false
            }
        case 'SET_CONVERSATION_SPINNER':
            return {
                ...cloneDeep(state),
                isShowSpinner: true
            }
        case 'ADD_MESSAGE': {
            const { messages, ...rest } = state            
            messages.push(messageData)

            return {
                ...cloneDeep(rest),
                messages
            }
        }
        case 'UPDATE_MESSAGE': {
            const { messages, ...rest } = state
            const index = messages.findIndex(m => m._id === updatedMessageData._id)
            messages.splice(index, 1, updatedMessageData)

            return {
                ...cloneDeep(rest),
                messages: cloneDeep(messages)
            }
        }
        case 'EDIT_MESSAGE': {
            const { messages } = state
            const { messageId, newValue, editionTimeStamp } = editedMessageData
            const message = messages.find(m => m._id === messageId)

            message.text = newValue
            message.editionTimeStamp = editionTimeStamp
            message.wasEdited = true
            message.wasEditedByCurrentUser = true

            return {
                ...cloneDeep(state)
            }
        }
        case 'DELETE_MESSAGE': {
            const { messages } = state
            const index = messages.findIndex(m => m._id === messageId)
            messages.splice(index, 1)

            return {
                ...cloneDeep(state)
            }
        }
        case 'UPDATE_MESSAGE_ID': {
            const { messages, ...rest } = state
            const { messageId } = messageUpdateData
            
            const lastMessage = messages.pop()
            lastMessage._id = messageId
            
            messages.push(lastMessage)

            return {
                ...cloneDeep(rest),
                messages
            }
        }
        default: return state
    }
}