import React, { Component } from 'react'
import TypingMessageItem from '../../../common/TypingMessageItem'
import { typingMessageHandler } from '../../../../utils/socket'

import * as Styles from './ConversationTileStyle'

const IS_TYPING_ITEM_DELAY = 5 //0.5sec

export class ConversationTile extends Component {

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
        const { conversation, isActive, handleClick } = this.props

        return (
            <Styles.ConversationStyle style={{ backgroundColor: isActive ? 'rgba(148,204,76,0.2)' : '' }}>
                <a href="javascript:void(0)" className="slds-text-link_reset slds-p-around_small slds-grid" onClick={() => handleClick(conversation._id)}>
                    <Styles.PhotoStyle className="slds-m-right_small slds-is-relative" style={{backgroundColor: conversation.color || '#94CC4C'}}><span className="slds-is-absolute">{conversation.title[0].toUpperCase()}</span></Styles.PhotoStyle>
                    <Styles.TruncateStyle className="slds-grid slds-grid_align-space slds-grid_vertical">
                        <div>{conversation.title}</div>
                        <Styles.TruncateStyle>
                            { !!usersTypingMessage.length ? (
                                <TypingMessageItem
                                    users={usersTypingMessage}
                                    isShow={!!usersTypingMessage.length}
                                />
                            ) : (
                                <span>CONVERSATION</span>
                            ) }
                        </Styles.TruncateStyle>
                    </Styles.TruncateStyle>
                    <Styles.UnreadMessageIndicatorStyle className={`slds-is-relative ${conversation.unreadMessagesCount ? '' : 'slds-hidden'}`}>
                        <span className="slds-is-absolute">{conversation.unreadMessagesCount}</span>
                    </Styles.UnreadMessageIndicatorStyle>
                </a>
            </Styles.ConversationStyle>
        )
    }

}

export const UserTile = ({ user, handleClick }) => (
    <Styles.ConversationStyle>
        <a href="javascript:void(0)" className="slds-text-link_reset slds-p-around_small slds-grid slds-grid_vertical-align-center" onClick={() => handleClick(user._id)}>
            <Styles.PhotoStyle className="slds-m-right_small slds-is-relative" style={{backgroundColor: user.color || '#94CC4C'}}><span className="slds-is-absolute">{user.name[0].toUpperCase()}</span></Styles.PhotoStyle>
            <div>
                <div>{user.name}</div>
                <div>USER</div>
            </div>
        </a>
    </Styles.ConversationStyle>
)