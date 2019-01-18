import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
    getConversations,
    getConversation,
    createConversation,
    searchForUsers
} from '../../../rest/index'
import {
    SET_CONVERSATION_LIST,
    SET_CONVERSATION,
    ADD_CONVERSATION,
    SET_CONVERSATION_SPINNER
} from '../../../redux/actions/actions'
import {
    subscribeToConversation,
    subscribeToConversations,
} from '../../../utils/socket'

import RealtimeSearchLookup from '../../common/RealtimeSearchLookup'
import { ConversationTile, UserTile } from './ConversationTile/ConversationTile'

import * as Styles from './ConversationsListStyle'

class ConversationsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            queryStr: '',
            lookUpUserList: [],
            isShowSpinner: true
        }
    }

    async componentDidMount() {
        const { user, SET_CONVERSATION_LIST } = this.props
        const conversations = await getConversations(user._id)

        const conversationsIds = conversations.map(conversation => conversation._id)

        SET_CONVERSATION_LIST(conversations)
        subscribeToConversations(conversationsIds)
        
        this.toggleSpinner()
    }

    toggleSpinner = () => this.setState(({ isShowSpinner }) => ({ isShowSpinner: !isShowSpinner }))

    clearSearchInput = () => this.setState({
        queryStr: '',
        lookUpUserList: [],
        isShowSpinner: false
    })
    
    handleChangeSearchBoxInput = async (e) => {
        const queryStr = e.target.value
        const { user, conversationList } = this.props

        if(!queryStr) {
            this.setState({
                queryStr,
                lookUpUserList: [],
                isShowSpinner: false
            })

            return
        }

        this.setState({
            queryStr,
            isShowSpinner: true
        })

        const privateConversationsIds = conversationList
            .filter(c => c.isPrivate)
            .map(c => c._id)

        const users = await searchForUsers(
            user._id,
            queryStr.trim(),
            privateConversationsIds
        ) || []

        this.setState({
            lookUpUserList: users.map(u => {
                u.isUser = true

                return u
            }),
            isShowSpinner: false
        })
    }

    changeConversation = async (conversationId) => {
        const { user, conversation, SET_CONVERSATION_SPINNER, SET_CONVERSATION } = this.props

        if(conversationId === conversation._id) return

        SET_CONVERSATION_SPINNER()

        const retrievedConversation = await getConversation(user._id, conversationId)

        SET_CONVERSATION(retrievedConversation)
    }

    createPrivateConversation = async (userId) => {
        const { user, ADD_CONVERSATION } = this.props
        const conversation = await createConversation(user._id, [ userId ])

        this.clearSearchInput()

        ADD_CONVERSATION(conversation)

        subscribeToConversation(conversation._id)
    }

    render() {
        const { conversation, conversationList } = this.props
        const { isShowSpinner, lookUpUserList, queryStr } = this.state

        const commonList = [...conversationList, ...lookUpUserList]
            .sort((a, b) => b[b.title ? 'title' : 'name'].includes(queryStr) - a[a.title ? 'title' : 'name'].includes(queryStr))

        return (
            <Styles.ConversationsListStyle className="slds-grid slds-grid_vertical">
                <RealtimeSearchLookup
                    value={queryStr}
                    clearSearchBox={this.clearSearchInput}
                    onInputHandler={this.handleChangeSearchBoxInput}
                    isShowSpinner={isShowSpinner}/>
                <Styles.MessagesListStyle>{
                    commonList.map(
                        (item, i) => (
                            item.isUser ? (
                                <UserTile
                                    key={i}
                                    user={item}
                                    handleClick={this.createPrivateConversation}/>
                            ) : (
                                <ConversationTile
                                    key={i}
                                    conversation={item}
                                    isActive={conversation._id === item._id}
                                    handleClick={this.changeConversation}/>
                            )
                        )
                    )
                }</Styles.MessagesListStyle>
            </Styles.ConversationsListStyle>
        )
    }

}

const mapStateToProps = ({ conversation, conversationList, authUser: { user } }) => ({ user, conversation, conversationList })
export default withRouter(
    connect(mapStateToProps, {
        SET_CONVERSATION_LIST,
        SET_CONVERSATION,
        ADD_CONVERSATION,
        SET_CONVERSATION_SPINNER
    })(ConversationsList)
)