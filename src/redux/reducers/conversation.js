import cloneDeep from 'lodash.clonedeep'

const initialState = {
    messages: [],
    companions: [],
    isShowSpinner: false
}

export default (state = initialState, { type, conversation, messageData, messageUpdateData }) => {
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