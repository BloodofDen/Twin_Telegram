import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { getConversations, getConversation, createConversation, searchForUsers } from '../../../rest/index'
import {
    SET_CONVERSATION_LIST,
    SET_CONVERSATION,
    ADD_CONVERSATION,
    SET_CONVERSATION_SPINNER
} from '../../../redux/actions/actions'
import RealtimeSearchLookup from '../../common/RealtimeSearchLookup'

const ConversationsStyle = styled.div`
    width: 30%;
    height: 100%;
    background-color: #fff;
    border-right: 2px solid rgba(230,235,239,1);
`

const ConversationStyle = styled.li`
    &:first-child {
        border-top: 2px solid rgba(230,235,239,1);
    }
    
    border-bottom: 2px solid rgba(230,235,239,1);
`

const PhotoStyle = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;

    > span {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 1.3rem;
    }
`

const UnreadMessageIndicatorStyle = styled.div`
    background: #EFAB9D;
    color: #fff;
    border-radius: 50%;
    font-weight: bold;
    font-size: 14px;
    width: 22px;
    height: 22px;
    margin-left: auto;
    align-self: flex-end;

    & > span {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -46%);
    }
`

const MessagesListStyle = styled.ul`
    overflow-y: auto;

    ul::-webkit-scrollbar {
        width: 10px;
    }
    ul::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.15);
            -webkit-border-radius: 10px;
            border-radius: 10px;
    }
    ul::-webkit-scrollbar-thumb {
            -webkit-border-radius: 10px;
            border-radius: 10px;
            background: #646464; 
    }
`

class Conversations extends Component {

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
        
        SET_CONVERSATION_LIST(conversations)
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
    }

    render() {
        const { conversation, conversationList } = this.props
        const { isShowSpinner, lookUpUserList, queryStr } = this.state

        const commonList = [...conversationList, ...lookUpUserList]
            .sort((a, b) => b[b.title ? 'title' : 'name'].includes(queryStr) - a[a.title ? 'title' : 'name'].includes(queryStr))

        return (
            <ConversationsStyle className="slds-grid slds-grid_vertical">
                <RealtimeSearchLookup
                    value={queryStr}
                    clearSearchBox={this.clearSearchInput}
                    onInputHandler={this.handleChangeSearchBoxInput}
                    isShowSpinner={isShowSpinner}/>
                <MessagesListStyle>{
                    commonList.map(
                        (item, i) => (
                            item.isUser ? (
                                <User
                                    key={i}
                                    user={item}
                                    handleClick={this.createPrivateConversation}/>
                            ) : (
                                <Conversation
                                    key={i}
                                    conversation={item}
                                    isActive={conversation._id === item._id}
                                    handleClick={this.changeConversation}/>
                            )
                        )
                    )
                }</MessagesListStyle>
            </ConversationsStyle>
        )
    }

}

const Conversation = ({ conversation, isActive, handleClick }) => (
    <ConversationStyle style={{ backgroundColor: isActive ? 'rgba(148,204,76,0.2)' : '' }}>
        <a href="javascript:void(0)" className="slds-text-link_reset slds-p-around_small slds-grid slds-grid_vertical-align-center" onClick={() => handleClick(conversation._id)}>
            <PhotoStyle className="slds-m-right_small slds-is-relative" style={{backgroundColor: conversation.color || '#94CC4C'}}><span className="slds-is-absolute">{conversation.title[0].toUpperCase()}</span></PhotoStyle>
            <div>
                <div>{conversation.title}</div>
                <div>CONVERSATION</div>
            </div>
            <UnreadMessageIndicatorStyle className={`slds-is-relative ${conversation.unreadMessagesCount ? '' : 'slds-hidden'}`}>
                <span className="slds-is-absolute">{conversation.unreadMessagesCount}</span>
            </UnreadMessageIndicatorStyle>
        </a>
    </ConversationStyle>
)

const User = ({ user, handleClick }) => (
    <ConversationStyle>
        <a href="javascript:void(0)" className="slds-text-link_reset slds-p-around_small slds-grid slds-grid_vertical-align-center" onClick={() => handleClick(user._id)}>
            <PhotoStyle className="slds-m-right_small slds-is-relative" style={{backgroundColor: user.color || '#94CC4C'}}><span className="slds-is-absolute">{user.name[0].toUpperCase()}</span></PhotoStyle>
            <div>
                <div>{user.name}</div>
                <div>USER</div>
            </div>
        </a>
    </ConversationStyle>
)

const mapStateToProps = ({ conversation, conversationList, authUser: { user } }) => ({ user, conversation, conversationList })
export default withRouter(
    connect(mapStateToProps, {
        SET_CONVERSATION_LIST,
        SET_CONVERSATION,
        ADD_CONVERSATION,
        SET_CONVERSATION_SPINNER
    })(Conversations)
)