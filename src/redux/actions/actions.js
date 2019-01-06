export const SET_USER = user => dispatch => dispatch({ type: 'SET_USER', user })
export const SET_CONVERSATION_LIST = conversations => dispatch => dispatch({ type: 'SET_CONVERSATION_LIST', conversations })
export const SET_CONVERSATION = conversation => dispatch => dispatch({ type: 'SET_CONVERSATION', conversation })
export const SET_CONVERSATION_SPINNER = () => dispatch => dispatch({ type: 'SET_CONVERSATION_SPINNER' })
export const ADD_CONVERSATION = conversation => dispatch => dispatch({ type: 'ADD_CONVERSATION', conversation })
export const ADD_MESSAGE = messageData => dispatch => dispatch({ type: 'ADD_MESSAGE', messageData })
export const UPDATE_MESSAGE_ID = messageUpdateData => dispatch => dispatch({ type: 'UPDATE_MESSAGE_ID', messageUpdateData })
export const INCREMENT_UNREAD_MESSAGE = conversationId => dispatch => dispatch({ type: 'INCREMENT_UNREAD_MESSAGE', conversationId })