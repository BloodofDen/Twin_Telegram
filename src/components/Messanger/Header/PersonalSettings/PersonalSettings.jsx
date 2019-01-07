import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import hamburgerIcon from '../../../../assets/hamburger-icon.svg'
import settingsIcon from '../../../../assets/settings-icon.svg'
import newGroupIcon from '../../../../assets/new-group-icon.svg'

const PersonalSettingsStyle = styled.div`
    width: 30%;
    cursor: pointer;    

    img {
        height: 24px;
    }
`
const LogoStyle = styled.div`
    padding: 10px 15px;
    
    &:hover {
        background-color: rgba(148,204,76,1);
    }
    
    & > span {
        font-weight: bold;
    }
`

const DropdownStyle = styled.div`
    margin: 0;
    padding: 0;
    border-radius: 0;
    color: rgba(148,204,76,1);
    border-right: 1px solid #94CC4C;
    border-left: 1px solid #94CC4C;

    & li {
        padding: 10px;

        &:hover {
            background-color: rgba(148,204,76,.1);
        }
        &:last-child {
            border-bottom: 1px solid #94CC4C;
        }
    }
    & span {
        font-weight: bold;
    }
`

const toggleDropDown = (e) => {
    const dropdown = e.target.closest('.slds-dropdown-trigger');

    dropdown.classList.toggle('slds-is-open')
}

const PersonalSettings = () => (
    <PersonalSettingsStyle className="slds-dropdown-trigger slds-dropdown-trigger_click" onClick={toggleDropDown} onBlur={toggleDropDown}>
        <LogoStyle className="slds-grid">
            <img src={hamburgerIcon} className="slds-m-right_medium" alt="Menu"/>
            <span className="slds-text-color_inverse slds-text-heading_medium">Telega</span>
        </LogoStyle>
        <DropdownStyle className="slds-dropdown slds-dropdown_fluid">
            <ul className="slds-dropdown__list" role="menu">
                <MenuItem title="New Conversation" path="/new_conversation" svgIcon={newGroupIcon}/>
                <MenuItem title="My Settings" path="/personal_info" svgIcon={settingsIcon}/>
            </ul>
        </DropdownStyle>
    </PersonalSettingsStyle>
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