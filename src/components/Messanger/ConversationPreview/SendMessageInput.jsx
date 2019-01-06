import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import moment from 'moment'
// import { SET_USER } from '../../redux/actions/actions'
// import { signInUser, signUpUser } from '../../rest/index'
// import Spinner from '../common/Spinner'
// import './Auth.css'

import { sendMessage } from '../../../rest/index'
import {
    ADD_MESSAGE,
    UPDATE_MESSAGE_ID
} from '../../../redux/actions/actions'

import sendButton from '../../../assets/send-button.svg'

const SendMessageInputStyle = styled.div`
    // background: gray;
    border-top: 2px solid rgba(230,235,239,1);
`

const IconStyle = styled.img`
    height: 32px;
`

const FormStyle = styled.form`
    margin: 0 auto;

    & > textarea {
        resize: none;
        min-width: 300px;
    }
`

const PhotoStyle = styled.div`
    width: 55px;
    height: 55px;
    border-radius: 50%;

    > span {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 1.3rem;
    }
`

const MyPhotoStyle = styled(PhotoStyle)`
    margin-right: auto;
`

const CompanionPhotoStyle = styled(PhotoStyle)`
    margin-left: auto;
`

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

        let { message } = this.state
        const { conversation, user, ADD_MESSAGE, UPDATE_MESSAGE_ID } = this.props

        message = message.trim()

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
            <SendMessageInputStyle className="slds-p-horizontal_xxx-small slds-p-vertical_small">
                <div className="slds-p-horizontal_small slds-grid slds-grid_vertical-align-center">
                    <MyPhotoStyle className="slds-is-relative" style={{backgroundColor: user.color || '#94CC4C'}}>
                        <span className="slds-is-absolute">{user.name[0].toUpperCase()}</span>
                    </MyPhotoStyle>
                    <FormStyle onSubmit={this.sendMessage}
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
                            <IconStyle src={sendButton} />
                        </button>
                    </FormStyle>
                    <CompanionPhotoStyle className="slds-is-relative" style={{backgroundColor: conversation.color || '#94CC4C'}}>
                        <span className="slds-is-absolute">{conversation[conversation.title ? 'title' : 'name'][0].toUpperCase()}</span>
                    </CompanionPhotoStyle>
                </div>
            </SendMessageInputStyle>
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