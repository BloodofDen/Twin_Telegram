import React from 'react'
import styled from 'styled-components'

const DropdownStyle = styled.div`
    outline: none !important;
    transition: all .3s;

    & .active-option {
        outline: 0;
        text-decoration: none;
        background-color: #f4f6f9;
    }
`

const ChevronStyle = styled.button`
    transition: all .3s !important;
    outline: none !important;
    margin-top: 0 !important;
    box-shadow: none !important;
`

const handleDropdownClick = e => {
    const dropdown = document.querySelectorAll('.slds-dropdown-trigger');
    const curDropdown = e.target.closest('.slds-dropdown-trigger');

    [].forEach.call(dropdown, el => {
        if(el !== curDropdown) {
            el.classList.remove('slds-is-open');
        }
    });

    curDropdown.classList.toggle('slds-is-open');
}

export default ({ title, className, children }) => (
    <DropdownStyle className={`slds-dropdown-trigger slds-dropdown-trigger_click ${className || ''}`} onClick={handleDropdownClick}>
      <ChevronStyle className="slds-button slds-button_icon" aria-haspopup="true" title="Types">
        <span className="slds-text-heading_medium">{title}</span>
        <span className="slds-m-left_x-small">
            <svg aria-hidden="true" className="slds-button__icon slds-icon_x-small">
                <use xlinkHref={chevronDownIcon}/>
            </svg>
        </span>
      </ChevronStyle>
      <div className="slds-dropdown slds-dropdown_fluid">
        {children}
      </div>
    </DropdownStyle>
);