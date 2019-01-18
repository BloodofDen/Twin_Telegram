import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import moment from 'moment'
import hexRgb from 'hex-rgb'

import closeIcon from '../../../../../assets/cross-icon.svg'
import editIcon from '../../../../../assets/edit-icon.svg'
import checkIcon from '../../../../../assets/check-icon.svg'
import editedIcon from '../../../../../assets/edited-icon.svg'
import recycleBinIcon from '../../../../../assets/waste_bin-icon.svg'

import * as Styles from './MessageStyle'

export default class Message extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: props.messageData.text || '',
            isEditMode: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.messageData.text && prevState.value !== nextProps.messageData.text) {
            return { ...nextProps }
        }

        return null
    }

    handleOnChange = e => this.setState({ value: e.target.value })

    toggleEditMode = () => this.setState(({ isEditMode }) => ({ isEditMode: !isEditMode }))

    editCancel = () => {
        const { messageData } = this.props

        this.setState({
            value: messageData.text,
            isEditMode: false
        })
    }

    editMessage = () => {
        const newValue = this.state.value.trim()
        const { messageData, onEdit } = this.props
        
        if(!newValue || newValue === messageData.text) {
            this.editCancel()
            
            return
        }
        
        this.toggleEditMode()

        onEdit(messageData._id, newValue)
    }

    deleteMessage = () => {
        const { messageData, history } = this.props

        /*this.context.router.*/history.push(`/m/${messageData._id}/d`)
    }

    checkHighlighted = (sender) => {
        const { loggedInUser } = this.props

        if(sender._id !== loggedInUser._id) return {}

        const { red, green, blue } = hexRgb(sender.color || '#94CC4C')
        
        return { backgroundColor: `rgba(${red}, ${green}, ${blue}, 0.1)` }
    }

    checkPressedKey = e => {
        const { value } = this.state

        if(e.which === 13 && !e.shiftKey && value.trim()) {
            e.preventDefault && e.preventDefault()

            this.editMessage()
        }
    }

    render() {
        const { isEditMode, value } = this.state
        const { loggedInUser, companions, messageData } = this.props
        const sender = companions.find(c => c._id === messageData.fromUserId) || loggedInUser

        return (
            <li className="slds-grid slds-grid_vertical slds-p-vertical_xxx-small slds-m-horizontal_xxx-small">
                <div className="slds-grid slds-p-horizontal_small slds-p-vertical_x-small" style={this.checkHighlighted(sender)}>
                    <Styles.PhotoStyle className="slds-is-relative slds-m-right_x-small" style={{backgroundColor: sender.color || '#94CC4C'}}><span className="slds-is-absolute">{sender.name[0].toUpperCase()}</span></Styles.PhotoStyle>
                    <Styles.MessageStyle className="slds-grid slds-grid_align-spread slds-m-top_xx-small">
                        <div>
                            <div className="slds-m-bottom_xx-small slds-grid">
                                <span className="slds-text-title_bold slds-m-bottom_xx-small slds-grid">{sender.name}</span>
                                { sender._id === loggedInUser._id && isEditMode &&
                                    <div className="slds-m-left_small">
                                        <Styles.ButtonStyle className="slds-button slds-button_icon" title="Save Changes" onMouseDown={this.editMessage}>
                                            <span className="slds-button__icon">
                                                <Styles.IconStyle src={checkIcon} className="slds-icon slds-icon-text-default"/>
                                            </span>
                                        </Styles.ButtonStyle>
                                        <Styles.ButtonStyle className="slds-button slds-button_icon" title="Cancel Changes" onClick={this.editCancel}>
                                            <span className="slds-button__icon">
                                                <Styles.IconStyle src={closeIcon} className="slds-icon slds-icon-text-default"/>
                                            </span>
                                        </Styles.ButtonStyle>
                                    </div> }

                                { sender._id === loggedInUser._id && !isEditMode &&
                                    <div className="edit-message slds-m-left_small">
                                        <Styles.ButtonStyle className="slds-button slds-button_icon" title="Edit Message" onClick={this.toggleEditMode}>
                                            <span className="slds-button__icon">
                                                <Styles.IconStyle src={editIcon} className="slds-icon slds-icon-text-default"/>
                                            </span>
                                        </Styles.ButtonStyle>
                                        <Styles.ButtonStyle className="slds-button slds-button_icon" title="Delete Message" onClick={this.deleteMessage}>
                                            <span className="slds-button__icon">
                                                <Styles.IconStyle src={recycleBinIcon} className="slds-icon slds-icon-text-default"/>
                                            </span>
                                        </Styles.ButtonStyle>
                                    </div> }
                            </div>
                            {isEditMode ? (
                                <form onSubmit={this.toggleEditMode}>
                                    <Styles.TextareaStyled
                                        maxRows={5}
                                        placeholder="Write your message here..."
                                        value={value || ''}
                                        onChange={this.handleOnChange}
                                        onKeyDown={this.checkPressedKey}
                                        onBlur={this.editCancel}
                                        autoFocus />
                                </form>
                            ) : (
                                <Styles.MessageTextStyle>{messageData.text}</Styles.MessageTextStyle>
                            )}
                        </div>
                        <div className="slds-grid slds-grid_vertical slds-grid_vertical-align-end">
                            <p>{moment(messageData.timeStamp).format('hh:mm:ss A')}</p>
                            { messageData.wasEdited && <Styles.IconStyle src={editedIcon} className="slds-m-top_x-small" alt="Edited" title={`Edited at ${moment(messageData.editionTimeStamp).format('hh:mm:ss A')}`} editStyle/> }
                        </div>
                    </Styles.MessageStyle>
                </div>
            </li>
        )
    }

}

// Message.contextTypes = {
//     router: PropTypes.object.isRequired
// }