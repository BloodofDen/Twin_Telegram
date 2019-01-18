export const SET_USER = user => dispatch => dispatch({ type: 'SET_USER', user })
export const SET_CONVERSATION_INFO_ID = conversationInfoId => dispatch => dispatch({ type: 'SET_CONVERSATION_INFO_ID', conversationInfoId })
export const SET_CONVERSATION_INFO = conversationInfo => dispatch => dispatch({ type: 'SET_CONVERSATION_INFO', conversationInfo })
export const SET_CONVERSATION_LIST = conversations => dispatch => dispatch({ type: 'SET_CONVERSATION_LIST', conversations })
export const SET_CONVERSATION = conversation => dispatch => dispatch({ type: 'SET_CONVERSATION', conversation })
export const SET_CONVERSATION_SPINNER = () => dispatch => dispatch({ type: 'SET_CONVERSATION_SPINNER' })
export const ADD_CONVERSATION = conversation => dispatch => dispatch({ type: 'ADD_CONVERSATION', conversation })
export const ADD_MESSAGE = messageData => dispatch => dispatch({ type: 'ADD_MESSAGE', messageData })
export const EDIT_USER = (field, value) => dispatch => dispatch({ type: 'EDIT_USER', field, value })
export const EDIT_MESSAGE = (messageId, newValue, editionTimeStamp) => dispatch => dispatch({
    type: 'EDIT_MESSAGE',
    editedMessageData: {
        messageId,
        newValue,
        editionTimeStamp
    }
})
export const UPDATE_MESSAGE = updatedMessageData => dispatch => dispatch({ type: 'UPDATE_MESSAGE', updatedMessageData })
export const UPDATE_MESSAGE_ID = updatedMessageId => dispatch => dispatch({ type: 'UPDATE_MESSAGE_ID', updatedMessageId })
export const DELETE_MESSAGE = messageId => dispatch => dispatch({ type: 'DELETE_MESSAGE', messageId })
export const INCREMENT_UNREAD_MESSAGE = conversationId => dispatch => dispatch({ type: 'INCREMENT_UNREAD_MESSAGE', conversationId })