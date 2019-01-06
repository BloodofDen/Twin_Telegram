import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authUser from './reducers/authUser'
import conversationList from './reducers/conversationList'
import conversation from './reducers/conversation'

export default combineReducers({
  authUser,
  conversation,
  conversationList,
  router: routerReducer
})