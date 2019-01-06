import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import moment from 'moment'
import hexRgb from 'hex-rgb'

const EmptyMessagingStyle = styled.div`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.1rem;
    font-style: italic;
    font-weight: bold;
    white-space: nowrap;
    user-select: none;
`

const MessageStyle = styled.div`
    flex-grow: 2;
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

const MessageListStyle = styled.div`
    overflow-y: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        width: 3px;
    }
    &::-webkit-scrollbar-track {
        background: rgba(148, 204, 76, 0.2);
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: rgba(148, 204, 76, 1);
    }
`

class MessageList extends Component {
    
    componentDidMount() {
        this.scrollToBottom()
    }
    
    componentDidUpdate() {
        this.scrollToBottom()
    }
    
    scrollToBottom = () => this.messagesEnd && this.messagesEnd.scrollIntoView({ behavior: 'smooth' })

    render() {
        const { conversation, user } = this.props

        if(!conversation.messages.length) {
            return (
                <EmptyMessagingStyle
                    className="slds-is-absolute">
                    No messages here yet...
                </EmptyMessagingStyle>
            )
        }

        return (
            <MessageListStyle>
                <ul>{
                    conversation.messages.map(
                        (message, i) => (
                            <Message
                                key={i}
                                loggedInUser={user}
                                companions={conversation.companions}
                                messageData={message}
                            />
                        )
                    )
                }</ul>
                <div style={{ float:'left', clear: 'both' }} ref={el => { this.messagesEnd = el }}/>
            </MessageListStyle>
        )
    }

}

const Message = ({ loggedInUser, companions, messageData }) => {
    const sender = companions.find(c => c._id === messageData.fromUserId) || loggedInUser
    let bgHighlighter = {}

    if(sender._id === loggedInUser._id) {
        const { red, green, blue } = hexRgb(sender.color || '#94CC4C')
        
        bgHighlighter = {backgroundColor: `rgba(${red}, ${green}, ${blue}, 0.3)`}
    }

    return (
        <li className="slds-grid slds-grid_vertical slds-p-vertical_xxx-small slds-m-horizontal_xxx-small">
            <div className="slds-grid slds-p-horizontal_small slds-p-vertical_x-small" style={bgHighlighter}>
                <PhotoStyle className="slds-is-relative slds-m-right_x-small" style={{backgroundColor: sender.color || '#94CC4C'}}><span className="slds-is-absolute">{sender.name[0].toUpperCase()}</span></PhotoStyle>
                <MessageStyle className="slds-grid slds-grid_align-spread slds-m-top_xx-small">
                    <div>
                        <div className="slds-text-title_bold">{sender.name}</div>
                        <div>{messageData.text}</div>
                    </div>
                    <div>{moment(messageData.timeStamp).format('hh:mm:ss A')}</div>
                </MessageStyle>
            </div>
        </li>
    )
}

const mapStateToProps = ({ conversation, authUser: { user } }) => ({ conversation, user })
export default withRouter(connect(
    mapStateToProps
)(MessageList))