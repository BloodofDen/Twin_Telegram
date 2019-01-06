import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import Spinner from '../../common/Spinner'

import MessageList from './MessageList'
import SendMessageInput from './SendMessageInput'

const MessagesStyle = styled.div`
    height: 100%;
    width: 70%;
    background-color: #fff;
`

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

const ConversationPreview = ({ conversation }) => (
    <MessagesStyle className="slds-grid slds-grid_align-spread slds-grid_vertical slds-grid_align-end slds-is-relative">
        {conversation._id ? (
            <Fragment>
                <MessageList/>
                <SendMessageInput/>
            </Fragment>
        ) : (
            <Fragment>
                {conversation.isShowSpinner ? (<Spinner />) : (
                    <EmptyMessagingStyle
                        className="slds-is-absolute">
                        Please select a chat to start messaging
                    </EmptyMessagingStyle>
                )}
            </Fragment>
        )}
    </MessagesStyle>
)

const mapStateToProps = ({ conversation }) => ({ conversation })
export default withRouter(connect(
    mapStateToProps
)(ConversationPreview))