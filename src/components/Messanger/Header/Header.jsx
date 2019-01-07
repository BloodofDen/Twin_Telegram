import React from 'react'
import styled from 'styled-components'

import PersonalSettings from './PersonalSettings/PersonalSettings'

const HeaderStyle = styled.header`
    background-color: rgba(148, 204, 76, 0.8);
    font-size: 1.5rem;
`

export default () => (
    <HeaderStyle>
        <PersonalSettings/>
    </HeaderStyle>
)