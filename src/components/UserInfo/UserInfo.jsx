import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { getUser } from '../../rest/index'
import { SET_CONVERSATION_INFO } from '../../redux/actions/actions'

import closeIcon from '../../assets/cross-icon.svg'
import smartphoneIcon from '../../assets/smartphone-icon.svg'
import emailIcon from '../../assets/email-icon.svg'
import atIcon from '../../assets/at-icon.svg'

import * as Styles from './UserInfoStyle'

class UserInfo extends Component {

    componentDidMount() {
        const { conversationInfo, SET_CONVERSATION_INFO } = this.props

        !conversationInfo.name &&
            getUser(conversationInfo._id)
                .then(conversationInfo => SET_CONVERSATION_INFO(conversationInfo))
    }

    closeModal = () => this.props.history.push('/')

    render() {
        const { conversationInfo } = this.props

        return (
            <div className="slds-is-absolute">
                <section tabIndex="-1" className="slds-modal slds-slide-up-open">
                    <div className="slds-modal__container">
                        <Styles.BackgroundStyle white>
                            <article className="slds-grid slds-grid_align-spread slds-p-around_small">
                                <p className="slds-text-heading_small slds-text-heading_label">User Info</p>
                                <div className="slds-grid">
                                    <button className="slds-button slds-button_icon" title="Close" onClick={this.closeModal}><Styles.IconStyle src={closeIcon} alt="Close"/></button>
                                </div>
                            </article>
                            <Styles.BackgroundStyle className="slds-p-vertical_small" green>
                                <div className="slds-grid slds-p-horizontal_medium">
                                    <Styles.PhotoStyle className="slds-is-relative slds-m-right_medium" style={{backgroundColor: conversationInfo.color || '#94CC4C'}}>
                                        <span className="slds-is-absolute slds-text-color_inverse">{conversationInfo.name ? conversationInfo.name[0].toUpperCase() : 'U'}</span>
                                    </Styles.PhotoStyle>
                                    <Styles.InfoStyle inversedColor>{conversationInfo.name || ''}</Styles.InfoStyle>
                                </div>
                            </Styles.BackgroundStyle>
                            <div className="slds-p-vertical_medium">
                                <article className="slds-p-horizontal_x-large slds-p-vertical_small">
                                    <div className="slds-grid slds-grid_vertical-align-center">
                                        <Styles.IconStyle src={atIcon} className="slds-m-right_xx-large" alt="Nickname" title="Nickname"/>
                                        <Styles.InfoStyle isEmpty={!conversationInfo.alias}>{conversationInfo.alias || '<empty>'}</Styles.InfoStyle>
                                    </div>
                                </article>
                                <article className="slds-p-horizontal_x-large slds-p-vertical_small">
                                    <div className="slds-grid slds-grid_vertical-align-center">
                                        <Styles.IconStyle src={emailIcon} className="slds-m-right_xx-large" alt="Email Address" title="Email Address"/>
                                        <Styles.InfoStyle isEmpty={!conversationInfo.email}>{conversationInfo.email || '<empty>'}</Styles.InfoStyle>
                                    </div>
                                </article>
                                <article className="slds-p-horizontal_x-large slds-p-vertical_small">
                                    <div className="slds-grid slds-grid_vertical-align-center">
                                        <Styles.IconStyle src={smartphoneIcon} className="slds-m-right_xx-large" alt="Phone" title="Phone"/>
                                        <Styles.InfoStyle isEmpty={!conversationInfo.phone}>{conversationInfo.phone || '<empty>'}</Styles.InfoStyle>
                                    </div>
                                </article>
                            </div>
                        </Styles.BackgroundStyle>
                    </div>
                </section>
                <div className="slds-backdrop slds-backdrop_open"/>
            </div>
        )
    }

}

const mapStateToProps = ({ conversationInfo }) => ({ conversationInfo })
export default withRouter(connect(
    mapStateToProps,
    {
        SET_CONVERSATION_INFO
    }
)(UserInfo))