import React from 'react'
import styled from 'styled-components'

const MenuStyle = styled.div`
    outline: none !important;
    transition: all .25s;
    z-index: 3 !important;

    & > button.rotate {
        transform: rotate(360deg);
    }
`

const IconStyle = styled.button`
    transition: all .25s !important;
    outline: none !important;
    margin-top: 0 !important;
    box-shadow: none !important;
`

const toggleDropDown = (e, effect) => {
    const dropdown = e.target.closest('.slds-dropdown-trigger');

    if(e.type === 'blur' && !dropdown.classList.contains('slds-is-open'))
        return;

    dropdown.firstElementChild.classList.toggle(effect);

    setTimeout(() => {dropdown.classList.toggle('slds-is-open')}, 250);
}

export default ({
    title,
    icon,
    effect,
    children
}) => (
    <MenuStyle className="slds-dropdown-trigger slds-dropdown-trigger_click" onClick={e => toggleDropDown(e, effect)} onBlur={e => toggleDropDown(e, effect)}>
      <IconStyle className="slds-button slds-button_icon" aria-haspopup="true" title={title}>
        <svg aria-hidden="true" className="slds-button__icon slds-icon_small">
            <use xlinkHref={icon}/>
        </svg>
      </IconStyle>
      <div className="slds-dropdown slds-dropdown_left">
        <ul className="slds-dropdown__list" role="menu">
          {children}
        </ul>
      </div>
    </MenuStyle>
);