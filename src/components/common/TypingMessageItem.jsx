import React from 'react'
import styled, { keyframes } from 'styled-components'

import typingIcon from '../../assets/typing-icon.svg'

const typing = keyframes`
    0% { transform: translateX(0px); }
    80% { transform: translateX(14px); }
    100% { transform: translateX(14px); }
`

const widthUpdate = keyframes`
    0% { width: 0%; }
    80% { width: 100%; }
    100% { width: 100%; }
`

const TypingMessageItemStyle = styled.div`
    font-style: italic;
    opacity: ${props => +props.isShow};
`

const TypingIconStyle = styled.div`
    bottom: 1px;

    > img {
        height: 14px;
        max-width: none;
        z-index: 4;
        animation: ${typing} 1s linear infinite;
    }

    > div {
        width: 100%;
        height: 2px;
        background: #000;
        bottom: 1px;
        animation: ${widthUpdate} 1s linear infinite;
    }
`

const getUsersNames = users => users
    .reduce((acc, { userName }) => acc + userName + ', ', '')
    .slice(0, -2)

export default ({ users, isShow }) => (
    <TypingMessageItemStyle className="slds-is-relative" isShow={isShow}>
        <span className="slds-m-right_x-small">
            <span className="slds-text-title_bold">{getUsersNames(users)}</span>
            {` ${users.length > 1 ? 'are' : 'is'} typing`}
        </span>
        <TypingIconStyle className="slds-show_inline-block slds-is-relative">
            <img src={typingIcon} className="slds-is-relative" alt="Typing Icon"/>
            <div className="slds-is-absolute"/>
        </TypingIconStyle>
    </TypingMessageItemStyle>
)