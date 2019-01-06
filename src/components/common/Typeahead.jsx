import React, { Component } from 'react'
import styled from 'styled-components'

const ListStyle = styled.div`
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;    
    overflow-y: auto !important;
    overflow-x: hidden !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    z-index: unset !important;

    & li:not(:last-child) {
        margin-bottom: .75rem !important;
    }

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.15);
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: #646464; 
    }
`

export default class Typeahead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue : '',
            filteredItems: props.items,
            typeaheadUniqueId: `typeahead-${Math.random().toString(36).substr(2, 9)}`
        };

        this.onInputHandler = this.onInputHandler.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(!this.state.filteredItems || !this.state.filteredItems.length) {
            this.setState({
                filteredItems:nextProps.items
            })
        }
    }

    onInputHandler(e) {
        const { value } = e.target
        const { items } = this.props
        
        this.setState({
            inputValue: value,
            filteredItems: items.filter(
                item => item.toLowerCase().includes(value.trim().toLowerCase())
            )
        })
    }

    onChooseHandler(item) {
        const { action } = this.props
        const { typeaheadUniqueId } = this.state

        document.querySelector(`#${typeaheadUniqueId}`).focus()

        action(item)
    }

    render() {
        const { inputValue, filteredItems, typeaheadUniqueId } = this.state
        const { placeholder, children } = this.props

        return (
            <div className="slds-combobox_container">
              <div className="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open" role="combobox">
                <div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
                  <input
                    id={typeaheadUniqueId}
                    type="search"
                    className="slds-input slds-combobox__input"
                    placeholder={placeholder || 'Search...'}
                    role="textbox"
                    value={inputValue}
                    onInput={this.onInputHandler}
                    autoComplete="off"/>
                  <span className="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right">
                    <svg className="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                      <use xlinkHref={searchIcon}/>
                    </svg>
                  </span>
                </div>
                <ListStyle className="slds-dropdown slds-dropdown_fluid slds-is-relative" role="listbox">
                  <ul className="slds-listbox slds-listbox_vertical" role="presentation">{
                    filteredItems.map((item, i) => (
                      <li key={i}
                        role="presentation"
                        className="slds-listbox__item slds-align_absolute-center slds-m-horizontal_xx-small"
                        onClick={() => this.onChooseHandler(item)}>
                        <button title={item}
                          className="slds-button slds-button_outline-brand slds-size_1-of-1 slds-truncate">
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </ListStyle>
              </div>
            </div>
        )
    }
}