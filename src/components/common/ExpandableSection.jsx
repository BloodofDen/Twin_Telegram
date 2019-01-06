import React from 'react'

export default ({ title, children }) => (
	<div className="slds-section">
	  <h3 className="slds-section__title" onClick={(e) => {e.target.closest('.slds-section').classList.toggle('slds-is-open')}}>
	    <button aria-expanded="true" className="slds-button slds-section__title-action">
	      <svg className="slds-section__title-action-icon slds-button__icon slds-button__icon_left" aria-hidden="true">
            <use xlinkHref={switchIcon}/>
          </svg>
	      <span className="slds-truncate" title="Section Title">{title}</span>
	    </button>
	  </h3>
	  <div aria-hidden="false" className="slds-section__content">
	    {children}
	  </div>
	</div>
);