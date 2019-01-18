import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { typingMessageHandler } from '../../../utils/socket'

import Spinner from '../../common/Spinner'
import TypingMessageItem from '../../common/TypingMessageItem'
import MessageList from './MessageList/MessageList'
import SendMessageInput from './SendMessageInput/SendMessageInput'

import * as Styles from './ConversationPreviewStyle'

const IS_TYPING_ITEM_DELAY = 5 //0.5sec

class ConversationPreview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usersTypingMessage: []
        }
    }

    componentDidMount() {
        typingMessageHandler(this.handleUserMessageTyping)
    }

    handleUserMessageTyping = ({ userId, userName, conversationId }) => {
        const { conversation } = this.props

        if(conversation._id !== conversationId) return

        this.setState(({ usersTypingMessage }) => {
            const index = usersTypingMessage.findIndex(u => u.userId === userId)
            
            if(index !== -1) return
            
            usersTypingMessage.push({ userId, userName })
            return {
                usersTypingMessage
            }
        })
        
        this.typingMessageTimer = IS_TYPING_ITEM_DELAY
        !this.counterId && this.startReversedTimer(userId)
    }

    startReversedTimer = userId => {
        this.counterId = setInterval(() => {
            if(this.typingMessageTimer) {
                this.typingMessageTimer--

                return
            }
            
            this.setState(({ usersTypingMessage }) => {
                const index = usersTypingMessage.findIndex(u => u.userId === userId)
                
                if(index === -1) return
                
                usersTypingMessage.splice(index, 1)
                return {
                    usersTypingMessage
                }
            })

            clearInterval(this.counterId)
            this.counterId = null
        }, 100)
    }

    render() {
        const { usersTypingMessage } = this.state
        const { conversation } = this.props

        return (
            <Styles.MessagesStyle className="slds-grid slds-grid_align-spread slds-grid_vertical slds-grid_align-end slds-is-relative">
                {conversation._id ? (
                    <Fragment>
                        <MessageList/>
                        <div className="slds-p-left_large slds-p-vertical_xx-small">
                            <TypingMessageItem
                                users={usersTypingMessage}
                                isShow={!!usersTypingMessage.length}
                            />
                        </div>
                        <SendMessageInput/>
                    </Fragment>
                ) : (
                    <Fragment>
                        {conversation.isShowSpinner ? (<Spinner />) : (
                            <Styles.EmptyMessagingStyle
                                className="slds-is-absolute">
                                Please select a chat to start messaging
                            </Styles.EmptyMessagingStyle>
                        )}
                    </Fragment>
                )}
            </Styles.MessagesStyle>
        )
    }

}

const mapStateToProps = ({ conversation }) => ({ conversation })
export default withRouter(connect(
    mapStateToProps
)(ConversationPreview))