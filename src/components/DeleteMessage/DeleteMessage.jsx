import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import ToggleButton from '../common/ToggleButton'

import { deleteMessage } from '../../rest/index'
import { DELETE_MESSAGE } from '../../redux/actions/actions'

import closeIcon from '../../assets/cross-icon.svg'

import * as Styles from './DeleteMessageStyle'

class DeleteMessage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isDeleteForEveryone: false
        }

        this.deleteMessage = this.deleteMessage.bind(this)
    }
    
    toggleState = () => this.setState(({ isDeleteForEveryone }) => ({ isDeleteForEveryone: !isDeleteForEveryone }))

    closeModal = () => this.props.history.push('/')

    deleteMessage() {
        const { isDeleteForEveryone } = this.state
        const { match, DELETE_MESSAGE } = this.props
        const messageId = match.params.id
        
        DELETE_MESSAGE(messageId)
        deleteMessage(messageId, isDeleteForEveryone)

        this.props.history.goBack()
    }

    render() {
        const { isDeleteForEveryone } = this.state

        return (
            <div className="slds-is-absolute">
                <section tabIndex="-1" className="slds-modal slds-slide-up-open">
                    <div className="slds-modal__container">
                        <Styles.PersonalInfoStyle>
                            <article className="slds-grid slds-grid_align-spread slds-p-around_small">
                                <p className="slds-text-heading_small slds-text-heading_label">Delete Message</p>
                                <div className="slds-grid">
                                    <button className="slds-button slds-button_icon" title="Close" onClick={this.closeModal}><Styles.IconStyle src={closeIcon} alt="Close"/></button>
                                </div>
                            </article>
                            <Styles.BgGreenStyle className="slds-p-vertical_large slds-text-align_center slds-text-color_inverse slds-text-heading_medium">
                                Are you sure you want to <b>delete</b> this message?
                            </Styles.BgGreenStyle>
                            <article className="slds-p-horizontal_medium slds-p-vertical_small slds-grid slds-grid_align-spread">
                                <div className="slds-grid slds-grid_vertical-align-center">
                                    <div className="slds-m-right_small">
                                        <ToggleButton checked={isDeleteForEveryone} onChange={this.toggleState}/>
                                    </div>
                                    <p>Delete for everyone?</p>
                                </div>
                                <div className="slds-grid">
                                    <Styles.ModalButtonInverseStyle className="slds-m-right_xx-small" onClick={this.closeModal}>
                                        Cancel
                                    </Styles.ModalButtonInverseStyle>
                                    <Styles.ModalButtonStyle onClick={this.deleteMessage}>
                                        Delete
                                    </Styles.ModalButtonStyle>
                                </div>
                            </article>
                        </Styles.PersonalInfoStyle>
                    </div>
                </section>
                <div className="slds-backdrop slds-backdrop_open"/>
            </div>
        )
    }
    
}

const mapStateToProps = () => ({})
export default withRouter(connect(
    mapStateToProps,
    {
        DELETE_MESSAGE
    }
)(DeleteMessage))