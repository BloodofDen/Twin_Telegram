import React from 'react'
import styled from 'styled-components'

const ToastStyle = styled.div`
    height: 4rem !important;
    position: absolute !important;
    top: -100vh !important;
    right: 0 !important;
    border: 0 !important;
    left: 0 !important;
    transition: all .3s ease-in-out !important;
`

const Toast = ({ type, text }) => (
    <ToastStyle id="toast">
      <div className="slds-notify_container slds-is-relative">
        <div className={`slds-notify slds-notify_toast slds-theme_${type}`} role="alert">
          <span className={`slds-icon_container slds-icon-utility-${type} slds-m-right_small slds-no-flex slds-align-top`}>
            <svg className="slds-icon slds-icon_small" aria-hidden="true">
              <use xlinkHref={type === 'warning' ? warningIcon : type === 'error' ? errorIcon : successIcon}/>
            </svg>
          </span>
          <div className="slds-notify__content">
            <h2 className="slds-text-heading_small">{text}</h2>
          </div>
          <button className="slds-button slds-button_icon slds-notify__close slds-button_icon-inverse" title="Close" onClick={() => {window.toast.classList.remove('show-toast')}}>
            <svg className="slds-button__icon slds-button__icon_large" aria-hidden="true">
              <use xlinkHref={closeIcon}/>
            </svg>
            <span className="slds-assistive-text">Close</span>
          </button>
        </div>
      </div>
    </ToastStyle>
);

const showToast = () => {
    window.toast.classList.add('show-toast');
    setTimeout(() => {
        window.toast.classList.remove('show-toast');
    }, 3100);
}

export { Toast, showToast };