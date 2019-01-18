import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import moment from 'moment'

import { editMessage } from '../../../../rest/index'
import { EDIT_MESSAGE } from '../../../../redux/actions/actions'

import Message from './Message/Message'

import * as Styles from './MessageListStyle'

class MessageList extends Component {
    
    componentDidMount() {
        this.scrollToBottom()
    }
    
    componentDidUpdate() {
        this.scrollToBottom()
    }
    
    scrollToBottom = () => this.messagesEnd && this.messagesEnd.scrollIntoView({ behavior: 'smooth' })

    editMessage = (messageId, newValue) => {
        const { EDIT_MESSAGE } = this.props
        const editionTimeStamp = moment().format()

        EDIT_MESSAGE(messageId, newValue, editionTimeStamp)
        editMessage(messageId, newValue, editionTimeStamp)
    }

    render() {
        const { conversation, user } = this.props

        if(!conversation.messages.length) {
            return (
                <Styles.EmptyMessagingStyle
                    className="slds-is-absolute">
                    No messages here yet...
                </Styles.EmptyMessagingStyle>
            )
        }

        return (
            <Styles.MessageListStyle>
                <ul>{
                    conversation.messages.map(
                        (message, i) => (
                            <Message
                                key={i}
                                loggedInUser={user}
                                companions={conversation.companions}
                                messageData={message}
                                onEdit={this.editMessage}
                            />
                        )
                    )
                }</ul>
                <div style={{ float:'left', clear: 'both' }} ref={el => { this.messagesEnd = el }}/>
            </Styles.MessageListStyle>
        )
    }

}

const mapStateToProps = ({ conversation, authUser: { user } }) => ({ user, conversation })
export default withRouter(connect(
    mapStateToProps,
    {
        EDIT_MESSAGE
    }
)(MessageList))