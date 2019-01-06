import React from 'react'

const toggleMouseActions = e => {
	const target = e.target.closest('.popover-config').querySelector('.slds-popover');

	target.classList.toggle('slds-fall-into-ground');
	target.classList.toggle('slds-rise-from-ground');
}

export default ({ text }) => (
	<div className="slds-is-relative popover-config" style={{marginRight: 'auto'}} onMouseOver={toggleMouseActions} onMouseOut={toggleMouseActions}>
	  <div className="slds-form-element">
	    <div className="slds-form-element__icon slds-align-middle slds-grid">
	      <button className="slds-button slds-button_icon slds-button slds-button_icon">
	        <svg className="slds-button__icon" aria-hidden="true">
              <use xlinkHref={infoIcon}/>
            </svg>
	        <span className="slds-assistive-text">Help</span>
	      </button>
	    </div>
	  </div>
	  <div className="slds-popover slds-popover_tooltip slds-nubbin_bottom slds-popover_small slds-is-absolute slds-fall-into-ground" role="tooltip" style={{bottom: '28px', transform: 'translateX(calc(-50% + 8px))', width: '10.5rem'}}>
	    <div className="slds-popover__body">{text}</div>
	  </div>
	</div>
);