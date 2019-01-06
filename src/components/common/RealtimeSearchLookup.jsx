import React from 'react'
import styled from 'styled-components'
import searchIcon from '../../assets/search-icon.svg'
import crossIcon from '../../assets/cross-icon.svg'

import Spinner from './Spinner'

const InputStyle = styled.input`
    border-radius: unset;
    padding-right: 25px;
    
    &:focus {
        border-color: #94CC4C;
        box-shadow: 0 0 3px #94CC4C;
    }
`

const IconStyle = styled.img`
    max-width: none;
`

const ButtonStyle = styled.button`
    top: 5px;
    right: 5px;

    & img {
        width: 1.2rem;
        height: 1.2rem;
    }
`

export default ({ value, clearSearchBox, onInputHandler, isShowSpinner }) => (
  <div className="slds-form-element slds-p-around_x-small">
    <div className="slds-form-element__control">
      <div className="slds-combobox_container">
        <div className="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click" role="combobox">
          <div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left slds-is-relative" role="none">
            <InputStyle
                className="slds-input slds-combobox__input"
                autoComplete="off"
                role="textbox"
                type="search"
                placeholder="Search..."
                value={value || ''}
                onChange={onInputHandler}/>

            {isShowSpinner ? (
                <Spinner className="slds-input__icon" x_small/>
            ) : (
                <span className="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_left" title="Search">
                    <IconStyle src={searchIcon} className="slds-icon slds-icon slds-icon_small slds-icon-text-default"/>
                </span>
            )}
            
            { value.trim() &&
                <ButtonStyle className="slds-button slds-button_icon slds-is-absolute" title="Clear" onClick={clearSearchBox}>
                    <span className="slds-button__icon">
                        <IconStyle src={crossIcon} className="slds-icon slds-icon slds-icon-text-default"/>
                    </span>
                </ButtonStyle> }
                
          </div>
        </div>
      </div>
    </div>
  </div>
)