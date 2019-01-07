import React from 'react'
import styled from 'styled-components'

const ToggleButtonStyle = styled.div`
    & {
        input[type=checkbox] {
            height: 0;
            width: 0;
            visibility: hidden;
        }
    
        label {
            cursor: pointer;
            text-indent: -9999px;
            width: 40px;
            height: 19px;
            background: grey;
            display: block;
            border-radius: 10px;
            position: relative;
        }
    
        label:after {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 15px;
            height: 15px;
            background: #fff;
            border-radius: 50%;
            transition: 0.3s;
        }
    
        input:checked + label {
            background: #94CC4C;
        }
    
        input:checked + label:after {
            left: calc(100% - 2px);
            transform: translateX(-100%);
        }
    
        label:active:after {
            width: 30px;
        }
    }    

`

export default ({ checked, onChange }) => {
    const uniqueId = Math.random().toString(36).substr(2, 11)

    return (
        <ToggleButtonStyle className="slds-grid">
            <input type="checkbox" id={uniqueId} checked={checked} onChange={onChange}/>
            <label htmlFor={uniqueId}>Toggle</label>
        </ToggleButtonStyle>
    )
}