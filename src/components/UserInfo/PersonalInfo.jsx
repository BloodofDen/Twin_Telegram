import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { HuePicker } from 'react-color'

import { editUser } from '../../rest/index'
import { EDIT_USER } from '../../redux/actions/actions'

import EditField from './EditField/EditField'

import closeIcon from '../../assets/cross-icon.svg'
import smartphoneIcon from '../../assets/smartphone-icon.svg'
import emailIcon from '../../assets/email-icon.svg'
import atIcon from '../../assets/at-icon.svg'
import paletteIcon from '../../assets/palette-icon.svg'

import * as Styles from './UserInfoStyle'

class PersonalInfo extends Component {

    closeModal = () => this.props.history.push('/')

    handleFieldValueChanged = (field, value) => this.props.EDIT_USER(field, value)

    handleChangeColor = ({ hex }) => this.props.EDIT_USER('color', hex)

    handleChangeColorComplete = ({ hex }) => {
        const field = 'color'
        const { user } = this.props

        editUser(user._id, field, hex).then(() => {
            const user = JSON.parse(localStorage.Auth)
            user[field] = hex

            localStorage.setItem('Auth', JSON.stringify(user))
        })
    }

    render() {
        const { user } = this.props

        return (
            <div className="slds-is-absolute">
                <section tabIndex="-1" className="slds-modal slds-slide-up-open">
                    <div className="slds-modal__container">
                        <Styles.BackgroundStyle white>
                            <article className="slds-grid slds-grid_align-spread slds-p-around_small">
                                <p className="slds-text-heading_small slds-text-heading_label">Personal Info</p>
                                <div className="slds-grid">
                                    <button className="slds-button slds-button_icon" title="Close" onClick={this.closeModal}><Styles.IconStyle src={closeIcon} alt="Close"/></button>
                                </div>
                            </article>
                            <Styles.BackgroundStyle className="slds-p-vertical_small" green>
                                <div className="slds-grid slds-p-horizontal_medium">
                                    <Styles.PhotoStyle className="slds-is-relative slds-m-right_medium" style={{backgroundColor: user.color || '#94CC4C'}}>
                                        <span className="slds-is-absolute slds-text-color_inverse">{user.name[0].toUpperCase()}</span>
                                    </Styles.PhotoStyle>
                                    <EditField field="name" obj={user} onChange={this.handleFieldValueChanged} inversedColor/>
                                </div>
                            </Styles.BackgroundStyle>
                            <div className="slds-p-vertical_medium">
                                <article className="slds-p-horizontal_x-large slds-p-vertical_small">
                                    <div className="slds-grid slds-grid_vertical-align-center">
                                        <Styles.IconStyle src={atIcon} className="slds-m-right_xx-large" alt="Nickname" title="Nickname"/>
                                        <EditField field="alias" obj={user} onChange={this.handleFieldValueChanged}/>
                                    </div>
                                </article>
                                <article className="slds-p-horizontal_x-large slds-p-vertical_small">
                                    <div className="slds-grid slds-grid_vertical-align-center">
                                        <Styles.IconStyle src={emailIcon} className="slds-m-right_xx-large" alt="Email Address" title="Email Address"/>
                                        <EditField field="email" obj={user} onChange={this.handleFieldValueChanged}/>
                                    </div>
                                </article>
                                <article className="slds-p-horizontal_x-large slds-p-vertical_small">
                                    <div className="slds-grid slds-grid_vertical-align-center">
                                        <Styles.IconStyle src={smartphoneIcon} className="slds-m-right_xx-large" alt="Phone" title="Phone"/>
                                        <EditField field="phone" obj={user} onChange={this.handleFieldValueChanged}/>
                                    </div>
                                </article>
                                <article className="slds-p-horizontal_x-large slds-p-vertical_small">
                                    <div className="slds-grid slds-grid_vertical-align-center">
                                        <Styles.IconStyle src={paletteIcon} className="slds-m-right_xx-large" alt="Profile color" title="Profile color"/>
                                        <HuePicker
                                            color={user.color || '#94CC4C'}
                                            onChange={this.handleChangeColor}
                                            onChangeComplete={this.handleChangeColorComplete}
                                        />
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

const mapStateToProps = ({ authUser: { user } }) => ({ user })
export default withRouter(connect(
    mapStateToProps,
    {
        EDIT_USER
    }
)(PersonalInfo))