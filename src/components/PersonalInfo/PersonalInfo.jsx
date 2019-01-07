import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { HuePicker } from 'react-color'

import { editUser } from '../../rest/index'
import { EDIT_USER } from '../../redux/actions/actions'

import Spinner from '../common/Spinner'

import closeIcon from '../../assets/cross-icon.svg'
import closeWhiteIcon from '../../assets/cross-icon_white.svg'
import editIcon from '../../assets/edit-icon.svg'
import editWhiteIcon from '../../assets/edit-icon_white.svg'
import checkIcon from '../../assets/check-icon.svg'
import checkWhiteIcon from '../../assets/check-icon_white.svg'
import smartphoneIcon from '../../assets/smartphone-icon.svg'
import emailIcon from '../../assets/email-icon.svg'
import atIcon from '../../assets/at-icon.svg'
import paletteIcon from '../../assets/palette-icon.svg'

import * as Style from './PersonalInfoStyle'

class PersonalInfo extends Component {

    closeModal = () => {
        const { history } = this.props

        history.push('/')
    }

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
                        <Style.PersonalInfoStyle>
                            <article className="slds-grid slds-grid_align-spread slds-p-around_small">
                                <p className="slds-text-heading_small slds-text-heading_label">Settings</p>
                                <div className="slds-grid">
                                    {/* <button className="slds-button slds-button_icon slds-m-right_x-small" title="Edit"><Style.IconStyle src={editIcon} alt="Edit"/></button> */}
                                    <button className="slds-button slds-button_icon" title="Close" onClick={this.closeModal}><Style.IconStyle src={closeIcon} alt="Close"/></button>
                                </div>
                            </article>
                            <Style.BgGreenStyle className="slds-p-vertical_small">
                                <div className="slds-grid slds-p-horizontal_medium">
                                    <Style.PhotoStyle className="slds-is-relative slds-m-right_medium" style={{backgroundColor: user.color || '#94CC4C'}}>
                                        <span className="slds-is-absolute slds-text-color_inverse">{user.name[0].toUpperCase()}</span>
                                    </Style.PhotoStyle>
                                    <EditField field="name" obj={user} onChange={this.handleFieldValueChanged} inversedColor/>
                                </div>
                            </Style.BgGreenStyle>
                            <div className="slds-p-vertical_medium">
                                <article className="slds-p-horizontal_x-large slds-p-vertical_small">
                                    <div className="slds-grid slds-grid_vertical-align-center">
                                        <Style.IconStyle src={atIcon} className="slds-m-right_xx-large" alt="Nickname" title="Nickname"/>
                                        <EditField field="alias" obj={user} onChange={this.handleFieldValueChanged}/>
                                    </div>
                                </article>
                                <article className="slds-p-horizontal_x-large slds-p-vertical_small">
                                    <div className="slds-grid slds-grid_vertical-align-center">
                                        <Style.IconStyle src={emailIcon} className="slds-m-right_xx-large" alt="Email Address" title="Email Address"/>
                                        <EditField field="email" obj={user} onChange={this.handleFieldValueChanged}/>
                                    </div>
                                </article>
                                <article className="slds-p-horizontal_x-large slds-p-vertical_small">
                                    <div className="slds-grid slds-grid_vertical-align-center">
                                        <Style.IconStyle src={smartphoneIcon} className="slds-m-right_xx-large" alt="Phone" title="Phone"/>
                                        <EditField field="phone" obj={user} onChange={this.handleFieldValueChanged}/>
                                    </div>
                                </article>
                                <article className="slds-p-horizontal_x-large slds-p-vertical_small">
                                    <div className="slds-grid slds-grid_vertical-align-center">
                                        <Style.IconStyle src={paletteIcon} className="slds-m-right_xx-large" alt="Profile color" title="Profile color"/>
                                        <HuePicker
                                            color={user.color || '#94CC4C'}
                                            onChange={this.handleChangeColor}
                                            onChangeComplete={this.handleChangeColorComplete}
                                        />
                                    </div>
                                </article>
                            </div>
                        </Style.PersonalInfoStyle>
                    </div>
                </section>
                <div className="slds-backdrop slds-backdrop_open"/>
            </div>
        )
    }

}

class EditField extends Component {

    constructor(props) {
        super(props)
        this.state = {
            initData: props.obj[props.field] || '',
            data: props.obj[props.field] || '',
            isEditMode: false,
            isShowSpinner: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.initData && prevState.initData !== nextProps.initData) {
            return { ...nextProps }
        }

        return null
    }

    componentDidMount() {
        this.inputField.readOnly = true 
    }

    handleOnChange = e => this.setState({ data: e.target.value })

    handleOnBlur = () => this.setState({ isEditMode: false })
    
    toggleSpinner = () => this.setState(({ isShowSpinner }) => ({ isShowSpinner: !isShowSpinner }))

    toggleEnableEditMode = () => this.setState(({ isEditMode }) => {
        this.inputField.readOnly = isEditMode
        
        !isEditMode && this.inputField.focus()

        return {
            isEditMode: !isEditMode
        }
    })

    editCancel = () => this.setState(({ initData }) => ({
        data: initData,
        isEditMode: false
    }))

    changeData = () => {
        let { data, initData } = this.state
        data = data.trim()
        
        if(!data || data === initData) {
            this.editCancel()
            
            return
        }
        
        const { field, obj, onChange } = this.props
        
        this.toggleEnableEditMode()
        this.toggleSpinner()

        onChange(field, data)
        editUser(obj._id, field, data).then(() => {
            const user = JSON.parse(localStorage.Auth)
            user[field] = data

            localStorage.setItem('Auth', JSON.stringify(user))
            this.toggleSpinner()
        })
    }

    render() {
        const { inversedColor } = this.props
        const { data, isEditMode, isShowSpinner } = this.state

        return (
            <div className="slds-form-element">
                <div className="slds-form-element__control">
                    <div className="slds-combobox_container">
                        <div className="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click">
                            <Style.EditDataFieldStyle className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right slds-is-relative" role="none">
                                <Style.InputStyle
                                    className="slds-input slds-combobox__input"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="<empty>"
                                    value={data || ''}
                                    onChange={this.handleOnChange}
                                    onBlur={this.handleOnBlur}
                                    isEditMode={isEditMode}
                                    isInversedColor={inversedColor}
                                    ref={input => { this.inputField = input; }}/>
                                    
                                { isEditMode ? (
                                    <Style.ShiftStyle className="slds-is-absolute">
                                        <Style.ButtonStyle className="slds-button slds-button_icon" title="Save" onClick={this.changeData}>
                                            <span className="slds-button__icon">
                                                <Style.IconStyle src={inversedColor ? checkWhiteIcon : checkIcon} className="slds-icon slds-icon slds-icon-text-default"/>
                                            </span>
                                        </Style.ButtonStyle>
                                        <Style.ButtonStyle className="slds-button slds-button_icon" title="Cancel" onClick={this.editCancel}>
                                            <span className="slds-button__icon">
                                                <Style.IconStyle src={inversedColor ? closeWhiteIcon : closeIcon} className="slds-icon slds-icon slds-icon-text-default"/>
                                            </span>
                                        </Style.ButtonStyle>
                                    </Style.ShiftStyle>
                                ) : (
                                    <Fragment>
                                        { isShowSpinner ? (
                                            <Spinner className="slds-input__icon" x_small/>
                                        ) : (
                                            <Style.ButtonShiftStyle className="slds-button slds-button_icon slds-is-absolute edit-icon" title="Edit" onClick={this.toggleEnableEditMode}>
                                                <span className="slds-button__icon">
                                                    <Style.IconStyle src={inversedColor ? editWhiteIcon : editIcon} className="slds-icon slds-icon slds-icon-text-default"/>
                                                </span>
                                            </Style.ButtonShiftStyle>
                                        )}
                                    </Fragment>
                                ) }                                    
                            </Style.EditDataFieldStyle>
                        </div>
                    </div>
                </div>
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