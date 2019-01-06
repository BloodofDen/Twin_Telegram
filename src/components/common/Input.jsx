import React from 'react'

export default ({
	name,
	value,
	label,
	placeholder,
	className,
	required,
	onChange,
	children
}) => (
	<div className={`slds-form-element ${className || ''}`}>
	  <label className="slds-form-element__label">
	  	{required && <abbr className="slds-required" title="This field is required">*</abbr>}
	  	{label}
	  	{children}
  	</label>
	  <div className="slds-form-element__control">
	    <input
	    	type="text"
	    	name={name}
	    	value={value}
	    	className="slds-input"
	    	placeholder={placeholder || 'Type text here...'}
			onChange={e => onChange(e.target.name, e.target.value)}
	    	/>
	  </div>
	</div>
);