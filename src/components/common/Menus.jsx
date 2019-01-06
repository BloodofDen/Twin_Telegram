import React, { Component } from 'react'
import onClickOutside from 'react-onclickoutside'

class MenusClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menusUniqueId: `menus-${Math.random().toString(36).substr(2, 9)}`
        }
    }

    handleOptionClick(e, status) {
        const allOptions = e.target.closest('ul').querySelectorAll('li>div');
        [].forEach.call(allOptions, o => {
            o.classList.remove('slds-is-selected', 'slds-has-focus');
        });

        e.target.closest('.slds-listbox__option').classList.add('slds-is-selected', 'slds-has-focus');

        this.props.action(status);
    }

    toggleMenu(e) {
        const curMenu = e.target.closest('.slds-dropdown-trigger');
        curMenu.classList.toggle('slds-is-open');
    }

    handleClickOutside = evt => {
        const { menusUniqueId } = this.state
        const menu = document.querySelector(`#${menusUniqueId}`).closest('.slds-dropdown-trigger')
        menu.classList.remove('slds-is-open')
    }

    getActiveTitle() {
        const { values, status, postfix } = this.props;
        let title = ''
        if(values[0] instanceof Object) {
            const val = values.find(v => v.id === status)
            val && (title = val.value)
        } else {
            title = status ? status.replace('surveyor__', '').replace('__c', '').replace('_', ' ') : '';
        }

        return title        
    }

    render() {
      const { values, status, postfix, label } = this.props;
      const { menusUniqueId } = this.state;

      return (
        <div className="slds-form-element">
          {label && <label className="slds-form-element__label">{label || ''}</label>}
          <div className="slds-form-element__control">
            <div className="slds-combobox_container">
              <div className="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click" aria-expanded="false" aria-haspopup="listbox" role="combobox" onClick={(e) => this.toggleMenu(e)}>
                <div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
                  <input type="text" className="slds-input slds-combobox__input slds-combobox__input-value" id={menusUniqueId} autoComplete="off" role="textbox" readOnly value={this.getActiveTitle() + (postfix || '')} style={{cursor:'pointer'}}/>
                  <span className="slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right">
                    <svg className="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                      <use xlinkHref={caretDownIcon}/>
                    </svg>
                  </span>
                </div>
                <div role="listbox">
                  <ul className="slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid" role="presentation">{
                    values.map((v, i) => (
                        <MenusItem key={i}
                          activeItem={status}
                          item={v}
                          handleOptionClick={this.handleOptionClick.bind(this)}/>
                      ))
                  }</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

const MenusItem = ({ item, activeItem, handleOptionClick }) => {
  // const option = value.replace('surveyor__', '').replace('__c', '').replace('_', ' ');

  const id = !item || typeof item === 'string' ? item : item.id
  const value = !item || typeof item === 'string' ? item : item.value

  return (
    <li role="presentation" className="slds-listbox__item">
      <div
        role="option"
        className={`slds-media slds-listbox__option slds-listbox__option_plain slds-media_small slds-media_center ${activeItem === value || activeItem === id ? 'slds-is-selected slds-has-focus' : ''}`}
        onClick={(e) => handleOptionClick(e, item)}>
        <span className="slds-media__figure">
          <svg className="slds-icon slds-icon_x-small slds-listbox__icon-selected" aria-hidden="true">
            <use xlinkHref={checkIcon}/>
          </svg>
        </span>
        <span className="slds-media__body">
          <span className="slds-truncate" title={value}>{value}</span>
        </span>
      </div>
    </li>
  )
};

export const Menus = onClickOutside(MenusClass);