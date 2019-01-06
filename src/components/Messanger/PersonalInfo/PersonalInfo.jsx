import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'

import closeIcon from '../../../assets/cross-icon.svg'

class PersonalInfo extends Component {

    closeModal = () => {
        const { history } = this.props

        history.push('/')
    }

    render() {
        return (
            <div className="slds-is-absolute">
                <section role="dialog" tabIndex="-1" aria-modal="true" className="slds-modal slds-slide-down-cancel">
                    <div className="slds-modal__container">
                    <header className="slds-modal__header">
                        <button className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close" onClick={this.closeModal}>
                        <img src={closeIcon} />
                        <span className="slds-assistive-text">Close</span>
                        </button>
                        <h2 className="slds-text-heading_medium slds-hyphenate">TEMP Text</h2>
                    </header>
                    <div className="slds-modal__content slds-p-around_medium slds-text-align_center">
                        
                    </div>
                    </div>
                </section>
                <div className="slds-backdrop slds-backdrop_open"/>
            </div>
        )
    }

}

const mapStateToProps = ({ }) => ({ })

export default withRouter(connect(
    mapStateToProps
)(PersonalInfo))