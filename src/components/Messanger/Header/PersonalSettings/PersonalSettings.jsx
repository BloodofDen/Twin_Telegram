import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import * as Styles from './PersonalSettingsStyle'

import hamburgerIcon from '../../../../assets/hamburger-icon.svg'
import settingsIcon from '../../../../assets/settings-icon.svg'
import newGroupIcon from '../../../../assets/new-group-icon.svg'

const toggleDropDown = e => {
    const dropdown = e.target.closest('.slds-dropdown-trigger')

    dropdown.classList.toggle('slds-is-open')
}

const PersonalSettings = () => (
    <Styles.PersonalSettingsStyle className="slds-dropdown-trigger slds-dropdown-trigger_click" onClick={toggleDropDown} onBlur={toggleDropDown}>
        <Styles.LogoStyle className="slds-grid">
            <img src={hamburgerIcon} className="slds-m-right_medium" alt="Menu"/>
            <span className="slds-text-color_inverse slds-text-heading_medium">Telega</span>
        </Styles.LogoStyle>
        <Styles.DropdownStyle className="slds-dropdown slds-dropdown_fluid">
            <ul className="slds-dropdown__list" role="menu">
                <MenuItem title="New Group Conversation" path="/new_conversation" svgIcon={newGroupIcon}/>
                <MenuItem title="My Settings" path="/personal_info" svgIcon={settingsIcon}/>
            </ul>
        </Styles.DropdownStyle>
    </Styles.PersonalSettingsStyle>
)

const MenuItem = ({ title, path, svgIcon }) => (
    <li role="presentation" className="slds-listbox__item">
        <Link to={path} className="slds-text-link_reset">
            <div className="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center">
                <span className="slds-media__figure">
                    <img src={svgIcon} className="slds-m-right_medium" alt={title}/>
                </span>
                <span className="slds-media__body">
                    <span className="slds-text-heading_small slds-truncate">{title}</span>
                </span>
            </div>
        </Link>
    </li>
)

const mapStateToProps = () => ({})
export default withRouter(connect(
    mapStateToProps
)(PersonalSettings))