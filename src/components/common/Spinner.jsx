import React from 'react'
import styled from 'styled-components'

const DotsStyle = styled.div`
	&:before, &:after {
		background: #94CC4C;
		fill: #94CC4C;
	}

	& > div {
		&:before, &:after {
			background: #94CC4C;
			fill: #94CC4C;
		}	
	}
`

export default ({ className, hasContainer, small, x_small }) => (
	<div className={`${hasContainer ? 'slds-spinner_container ' : ''}${className || ''}`}>
  		<DotsStyle role="status" className={`slds-spinner ${small ? 'slds-spinner_small' : x_small ? 'slds-spinner_x-small' : 'slds-spinner_medium'}`}>
    		<span className="slds-assistive-text">Loading</span>
    		<div className="slds-spinner__dot-a"/>
    		<div className="slds-spinner__dot-b"/>
  		</DotsStyle>
	</div>
)