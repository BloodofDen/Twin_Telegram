import React from 'react'

export default ({ name, value, label, placeholder, className, onChange }) => (
	<div className={`slds-form-element ${className || ''}`}>
	  <label className="slds-form-element__label">{label}</label>
	  <div className="slds-form-element__control">
	    <textarea 
	    	rows="15"
	    	name={name}
	    	value={value}
	    	className="slds-textarea"
    		placeholder={placeholder || 'Type text here...'}
    		onChange={e => onChange(e.target.name, e.target.value)}
		/>
	  </div>
	</div>
);