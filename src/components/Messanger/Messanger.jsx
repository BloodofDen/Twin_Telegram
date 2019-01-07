import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Pusher from 'pusher-js'
import styled from 'styled-components'

import { fetchMessage } from '../../rest/index'
import {
    ADD_MESSAGE,
    UPDATE_MESSAGE,
    DELETE_MESSAGE,
    INCREMENT_UNREAD_MESSAGE
} from '../../redux/actions/actions'

import Header from './Header/Header'
import ConversationPreview from './ConversationPreview/ConversationPreview'
import Conversations from './Conversations/Conversations'

const PUSHER_APP_KEY = '64ff9c2816e5fc2acb6d'
const PUSHER_APP_CLUSTER = 'eu'

const MessangerStyle = styled.div`
    height: 95vh;
    min-height: 95vh;
    width: 80%;
    max-width: 1010px;
    min-width: 300px;
    margin: 0 auto;
`

const MainStyle = styled.div`
    height: 100%;
`

class Messanger extends Component {

    componentDidMount() {
        const pusher = new Pusher(PUSHER_APP_KEY, {
            cluster: PUSHER_APP_CLUSTER,
            forceTLS: true,
        })

        this.messagesChannel = pusher.subscribe('messages')
        this.messagesChannel.bind('insert', this.handleMessageInsert)
        this.messagesChannel.bind('update', this.handleMessageUpdate)
    }

    handleMessageInsert = newMessage => {
        const { user, conversationList, conversation, ADD_MESSAGE, INCREMENT_UNREAD_MESSAGE } = this.props

        if(conversationList.findIndex(c => c._id === newMessage.conversationId) === -1) {
            console.log('IT IS NOT YOUR MESSAGE!')

            return
        }

        if(conversation._id === newMessage.conversationId) {
            if(conversation.messages.findIndex(m => m._id === newMessage._id) !== -1) {
                console.log('THIS MESSAGE IS ALREADY IN YOUR LIST')

                return
            }

            fetchMessage(user._id, newMessage._id).then(msg => ADD_MESSAGE(msg))
        } else {
            INCREMENT_UNREAD_MESSAGE(newMessage.conversationId)
        }
    }

    handleMessageUpdate = ({ updatedMessageId, updatedFields }) => {
        const { user, conversation: { messages }, UPDATE_MESSAGE, DELETE_MESSAGE } = this.props
        const message = messages.find(m => m._id === updatedMessageId)

        if(!message) {
            console.log('IT IS NOT YOUR MESSAGE OR IT WAS REMOVED!')

            return
        }

        if(updatedFields.wasDeletedGlobally) {
            DELETE_MESSAGE(updatedMessageId)

            return
        }

        if(message.wasEdited && message.wasEditedByCurrentUser) {
            console.log('THIS MESSAGE IS ALREADY UPDATED IN YOUR LIST')

            return
        }

        fetchMessage(user._id, updatedMessageId).then(msg => UPDATE_MESSAGE(msg))
    }

    render() {
        return (
            <MessangerStyle className="slds-grid slds-grid_vertical">
                <Header/>
                <MainStyle className="slds-grid">
                    <Conversations/>
                    <ConversationPreview/>
                </MainStyle>
            </MessangerStyle>
        )
    }

}

const mapStateToProps = ({ conversation, conversationList, authUser: { user } }) => ({ user, conversation, conversationList })
export default withRouter(
    connect(mapStateToProps, {
        ADD_MESSAGE,
        UPDATE_MESSAGE,
        DELETE_MESSAGE,
        INCREMENT_UNREAD_MESSAGE
    })(Messanger)
)