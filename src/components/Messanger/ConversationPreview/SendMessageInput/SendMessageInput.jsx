import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { sendMessage } from '../../../../rest/index'
import { ADD_MESSAGE, UPDATE_MESSAGE_ID } from '../../../../redux/actions/actions'
import sendButton from '../../../../assets/send-button.svg'

import * as Styles from './SendMessageInputStyle'

class SendMessageInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    checkPressedKey = e => {
        const { message } = this.state

        if(e.which === 13 && !e.shiftKey && message.trim()) {
            e.preventDefault && e.preventDefault()

            this.sendMessage(e)
        }
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

        const messageId = await sendMessage(messageData)

        UPDATE_MESSAGE_ID({ conversationId: conversation._id, messageId })
    }

    cleanInput = () => this.setState({ message: '' })

    render() {
        const { conversation, user } = this.props
        const { message } = this.state

        return (
            <Styles.SendMessageInputStyle className="slds-p-horizontal_xxx-small slds-p-vertical_small">
                <div className="slds-p-horizontal_small slds-grid slds-grid_vertical-align-center">
                    <Link to="/personal_info" className="slds-text-link_reset">
                        <Styles.MyPhotoStyle className="slds-is-relative" style={{backgroundColor: user.color || '#94CC4C'}}>
                            <span className="slds-is-absolute">{user.name[0].toUpperCase()}</span>
                        </Styles.MyPhotoStyle>
                    </Link>
                    <Styles.FormStyle onSubmit={this.sendMessage}
                        className="slds-grid slds-grid_vertical-align-center slds-grid_align-space">
                        <textarea
                            rows="2"
                            className="slds-textarea slds-m-right_medium"
                            placeholder="Type your message here..."
                            value={message}
                            onChange={this.handleChangeInput}
                            onKeyDown={this.checkPressedKey}
                        />
                        <button className="slds-button slds-button_icon" title="Send Message" onClick={this.sendMessage}>
                            <Styles.IconStyle src={sendButton} />
                        </button>
                    </Styles.FormStyle>
                    <Styles.CompanionPhotoStyle className="slds-is-relative" style={{backgroundColor: conversation.color || '#94CC4C'}}>
                        <span className="slds-is-absolute">{conversation[conversation.title ? 'title' : 'name'][0].toUpperCase()}</span>
                    </Styles.CompanionPhotoStyle>
                </div>
            </Styles.SendMessageInputStyle>
        )
    }

}

const mapStateToProps = ({ conversation, authUser : { user } }) => ({ conversation, user })
export default withRouter(connect(
    mapStateToProps,
    {
        ADD_MESSAGE,
        UPDATE_MESSAGE_ID
    }
)(SendMessageInput))