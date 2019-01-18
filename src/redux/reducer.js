import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authUser from './reducers/authUser'
import conversationList from './reducers/conversationList'
import conversation from './reducers/conversation'
import conversationInfo from './reducers/conversationInfo'

export default combineReducers({
  authUser,
  conversation,
  conversationList,
  conversationInfo,
  router: routerReducer
})