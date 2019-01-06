import React from 'react'

export default ({ itemId, action, toggleModal, headerText, bodyText, firstButton, secondButton }) => (
  <div className="slds-is-absolute" style={{height: '640px'}}>
    <section role="dialog" tabIndex="-1" aria-modal="true" className="slds-modal slds-slide-down-cancel">
      <div className="slds-modal__container">
        <header className="slds-modal__header">
          <button className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close" onClick={e => toggleModal()}>
            <svg className="slds-button__icon slds-button__icon_large" aria-hidden="true">
              <use xlinkHref={closeIcon}/>
            </svg>
            <span className="slds-assistive-text">Close</span>
          </button>
          <h2 className="slds-text-heading_medium slds-hyphenate">{headerText}</h2>
        </header>
        <div className="slds-modal__content slds-p-around_medium slds-text-align_center">
          <p>{bodyText}</p>
        </div>
        <footer className="slds-modal__footer">
          <button className="slds-button slds-button_neutral" onClick={e => toggleModal()}>{firstButton}</button>
          <button className="slds-button slds-button_brand slds-m-left--small" onClick={e => action(itemId)}>{secondButton}</button>
        </footer>
      </div>
    </section>
    <div className="slds-backdrop slds-backdrop_open"/>
  </div>
);