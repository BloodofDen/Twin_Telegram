import React from 'react'

export default ({ name, text, isShow, toggleState, children, isDisabled }) => {
	const uniqueId = Math.random().toString(36).substr(2, 9);

	return (
		<span className="slds-checkbox">
	      <input type="checkbox" name={name} id={`checkbox-${uniqueId}`} value="on" disabled={isDisabled} checked={isShow} onChange={(e) => toggleState(e)} />
	      <label className="slds-checkbox__label slds-grid slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-m-top_xx-small" htmlFor={`checkbox-${uniqueId}`}>
	        <div className="slds-grid slds-grid_vertical-align-center" style={{maxWidth: '9rem'}}>
		        <span className="slds-form-element__label">{text}</span>
		        {children}
	        </div>
	        <span className="slds-checkbox_faux"/>
	      </label>
	    </span>
	);
}