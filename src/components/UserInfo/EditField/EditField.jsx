import React, { Component, Fragment } from 'react'
import { editUser } from '../../../rest/index'
import Spinner from '../../common/Spinner'

import closeIcon from '../../../assets/cross-icon.svg'
import closeWhiteIcon from '../../../assets/cross-icon_white.svg'
import editIcon from '../../../assets/edit-icon.svg'
import editWhiteIcon from '../../../assets/edit-icon_white.svg'
import checkIcon from '../../../assets/check-icon.svg'
import checkWhiteIcon from '../../../assets/check-icon_white.svg'

import * as Styles from './EditFieldStyle'

export default class EditField extends Component {

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
        
        isEditMode
            ? this.inputField.blur()
            : this.inputField.focus()

        return {
            isEditMode: !isEditMode
        }
    })

    editCancel = () => this.setState(({ initData }) => ({
        data: initData,
        isEditMode: false
    }))

    checkPressedKey = e => {
        const { data } = this.state

        if(e.which === 13 && !e.shiftKey && data.trim()) {
            e.preventDefault && e.preventDefault()

            this.changeData()
        }
    }

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
                            <Styles.EditDataFieldStyle className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right slds-is-relative" role="none">
                                <Styles.InputStyle
                                    className="slds-input slds-combobox__input"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="<empty>"
                                    value={data || ''}
                                    onChange={this.handleOnChange}
                                    onKeyDown={this.checkPressedKey}
                                    onBlur={this.handleOnBlur}
                                    isEditMode={isEditMode}
                                    isInversedColor={inversedColor}
                                    ref={input => { this.inputField = input; }}/>
                                    
                                { isEditMode ? (
                                    <Styles.ShiftStyle className="slds-is-absolute">
                                        <Styles.ButtonStyle className="slds-button slds-button_icon" title="Save" onMouseDown={this.changeData}>
                                            <span className="slds-button__icon">
                                                <Styles.IconStyle src={inversedColor ? checkWhiteIcon : checkIcon} className="slds-icon slds-icon slds-icon-text-default"/>
                                            </span>
                                        </Styles.ButtonStyle>
                                        <Styles.ButtonStyle className="slds-button slds-button_icon" title="Cancel" onClick={this.editCancel}>
                                            <span className="slds-button__icon">
                                                <Styles.IconStyle src={inversedColor ? closeWhiteIcon : closeIcon} className="slds-icon slds-icon slds-icon-text-default"/>
                                            </span>
                                        </Styles.ButtonStyle>
                                    </Styles.ShiftStyle>
                                ) : (
                                    <Fragment>
                                        { isShowSpinner ? (
                                            <Spinner className="slds-input__icon" x_small/>
                                        ) : (
                                            <Styles.ButtonShiftStyle className="slds-button slds-button_icon slds-is-absolute edit-icon" title="Edit" onClick={this.toggleEnableEditMode}>
                                                <span className="slds-button__icon">
                                                    <Styles.IconStyle src={inversedColor ? editWhiteIcon : editIcon} className="slds-icon slds-icon slds-icon-text-default"/>
                                                </span>
                                            </Styles.ButtonShiftStyle>
                                        )}
                                    </Fragment>
                                ) }                                    
                            </Styles.EditDataFieldStyle>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}