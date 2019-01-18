export default (state = {}, { type, conversationInfoId, conversationInfo }) => {
    switch (type) {
        case 'SET_CONVERSATION_INFO_ID':
            return {
                _id: conversationInfoId
            }
        case 'SET_CONVERSATION_INFO':
            return {
                ...conversationInfo
            }
        default: return state
    }
}