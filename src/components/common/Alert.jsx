import React from 'react'

export default ({ text }) => (
	<div className="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert">
	  <span className="slds-assistive-text">error</span>
	  <span className="slds-icon_container slds-icon-utility-error slds-m-right_x-small">
	    <svg className="slds-icon slds-icon_x-small" aria-hidden="true">
            <use xlinkHref={errorIcon}/>
      	</svg>
	  </span>
	  <h2>{text}</h2>
	</div>
);