import cloneDeep from 'lodash.clonedeep'

export default (state = [], { type, conversations, conversation, conversationId }) => {
    switch (type) {
        case 'SET_CONVERSATION_LIST':
            return [
                ...cloneDeep(conversations)
            ]
        case 'SET_CONVERSATION': {
            const c = state.find(c => c._id === conversation._id)
            c.unreadMessagesCount = 0

            return [
                ...cloneDeep(state)
            ]
        }
        case 'ADD_CONVERSATION':
            return [
                ...cloneDeep(state),
                cloneDeep(conversation)
            ]
        case 'INCREMENT_UNREAD_MESSAGE': {
            const c = state.find(c => c._id === conversationId)
            c.unreadMessagesCount++

            return [
                ...cloneDeep(state)
            ]
        }
        default: return state
    }
}