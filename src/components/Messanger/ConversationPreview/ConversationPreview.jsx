import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Spinner from '../../common/Spinner'

import MessageList from './MessageList/MessageList'
import SendMessageInput from './SendMessageInput/SendMessageInput'

import * as Styles from './ConversationPreviewStyle'

const ConversationPreview = ({ conversation }) => (
    <Styles.MessagesStyle className="slds-grid slds-grid_align-spread slds-grid_vertical slds-grid_align-end slds-is-relative">
        {conversation._id ? (
            <Fragment>
                <MessageList/>
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

const mapStateToProps = ({ conversation }) => ({ conversation })
export default withRouter(connect(
    mapStateToProps
)(ConversationPreview))