import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'

import { acceptNewMessage, acceptEditMessage } from '../../utils/socket'

import { readMessage } from '../../rest/index'
import {
    ADD_MESSAGE,
    UPDATE_MESSAGE,
    DELETE_MESSAGE,
    INCREMENT_UNREAD_MESSAGE
} from '../../redux/actions/actions'

import Header from './Header/Header'
import ConversationPreview from './ConversationPreview/ConversationPreview'
import ConversationsList from './ConversationsList/ConversationsList'

const MessangerStyle = styled.div`
    height: 95vh;
    max-width: 1010px;
    min-width: 300px;
    margin: 0 auto;
`

const MainStyle = styled.div`
    height: 100%;
`

class Messanger extends Component {

    componentDidMount() {
        acceptNewMessage(this.handleMessageInsert)
        acceptEditMessage(this.handleMessageUpdate)
    }

    handleMessageInsert = message => {
        const { user, conversation, ADD_MESSAGE, INCREMENT_UNREAD_MESSAGE } = this.props

        if(message.fromUserId === user._id) return

        if(conversation._id === message.conversationId) {
            ADD_MESSAGE(message)
            readMessage(user._id, message.conversationId)

            return
        }

        INCREMENT_UNREAD_MESSAGE(message.conversationId)
    }

    handleMessageUpdate = updatedMessageData => {
        const { messageId, updatedFields } = updatedMessageData
        const { conversation: { messages }, UPDATE_MESSAGE, DELETE_MESSAGE } = this.props
        const message = messages.find(m => m._id === messageId)

        if(!message) {
            console.log('THIS MESSAGE WAS DELETED FROM YOUR LIST')

            return
        }

        if(updatedFields.wasDeletedGlobally) {
            DELETE_MESSAGE(messageId)

            return
        }

        if(message.wasEdited && message.wasEditedByCurrentUser) {
            console.log('THIS MESSAGE IS ALREADY UPDATED IN YOUR LIST')

            return
        }

        UPDATE_MESSAGE(updatedMessageData)
    }

    render() {
        return (
            <MessangerStyle className="slds-grid slds-grid_vertical">
                <Header/>
                <MainStyle className="slds-grid">
                    <ConversationsList/>
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