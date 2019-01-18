import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { typingMessage } from '../../../../utils/socket'
import { sendMessage } from '../../../../rest/index'
import { ADD_MESSAGE, UPDATE_MESSAGE_ID, SET_CONVERSATION_INFO_ID } from '../../../../redux/actions/actions'
import sendButton from '../../../../assets/send-button.svg'

import * as Styles from './SendMessageInputStyle'

class SendMessageInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    handlePressedKey = e => {
        const { message } = this.state
        const { user, conversation } = this.props

        if(e.which === 13 && !e.shiftKey && message.trim()) {
            e.preventDefault && e.preventDefault()
            
            this.sendMessage(e)
            
            return
        }

        typingMessage(user._id, user.name, conversation._id)
    }

    handleChangeInput = e => this.setState({ message: e.target.value })

    sendMessage = async (e) => {
        e.preventDefault && e.preventDefault()

        const message = this.state.message.trim()
        const { conversation, user, ADD_MESSAGE, UPDATE_MESSAGE_ID } = this.props

        if(!message) return

        this.cleanInput()

        const messageData = {
            conversationId: conversation._id,
            fromUserId: user._id,
            text: message,
            timeStamp: moment().format()
        }
        
        ADD_MESSAGE(messageData)
        sendMessage(messageData).then(messageId => UPDATE_MESSAGE_ID(messageId))
    }

    cleanInput = () => this.setState({ message: '' })

    showConversationInfo = () => {
        const { conversation, history, conversationInfo, SET_CONVERSATION_INFO_ID } = this.props

        if (conversation.isPrivate) {
            const [ companion ] = conversation.companions

            companion._id !== conversationInfo._id
                && SET_CONVERSATION_INFO_ID(companion._id)
        } else {
            conversation._id !== conversationInfo._id
                && SET_CONVERSATION_INFO_ID(conversation._id)
        }
        
        history.push(
            conversation.isPrivate
                ? '/user_info'
                : '/group_info'
        )
    }

    render() {
        const { message } = this.state
        const { conversation, user } = this.props

        return (
            <Styles.SendMessageInputStyle className="slds-p-horizontal_xxx-small slds-p-vertical_small">
                <div className="slds-p-horizontal_small slds-grid slds-grid_vertical-align-center">
                    <Link to="/personal_info" className="slds-text-link_reset">
                        <Styles.PhotoStyle className="slds-is-relative" style={{backgroundColor: user.color || '#94CC4C'}}>
                            <span className="slds-is-absolute">{user.name[0].toUpperCase()}</span>
                        </Styles.PhotoStyle>
                    </Link>
                    <Styles.FormStyle onSubmit={this.sendMessage}
                        className="slds-grid slds-grid_vertical-align-center slds-grid_align-space">
                        <textarea
                            rows="2"
                            className="slds-textarea slds-m-right_medium"
                            placeholder="Type your message here..."
                            value={message}
                            onChange={this.handleChangeInput}
                            onKeyDown={this.handlePressedKey}
                        />
                        <button className="slds-button slds-button_icon" title="Send Message" onClick={this.sendMessage}>
                            <Styles.IconStyle src={sendButton} />
                        </button>
                    </Styles.FormStyle>
                    <a href="javascript:void(0)" className="slds-text-link_reset" onClick={this.showConversationInfo}>
                        <Styles.PhotoStyle className="slds-is-relative" style={{backgroundColor: conversation.color || '#94CC4C'}}>
                            <span className="slds-is-absolute">{conversation.title[0].toUpperCase()}</span>
                        </Styles.PhotoStyle>
                    </a>
                </div>
            </Styles.SendMessageInputStyle>
        )
    }

}

const mapStateToProps = ({ conversation, authUser : { user }, conversationInfo }) => ({ user, conversation, conversationInfo })
export default withRouter(connect(
    mapStateToProps,
    {
        ADD_MESSAGE,
        UPDATE_MESSAGE_ID,
        SET_CONVERSATION_INFO_ID
    }
)(SendMessageInput))