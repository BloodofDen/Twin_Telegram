import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
// import { SET_USER } from '../../redux/actions/actions'
// import { signInUser, signUpUser } from '../../rest/index'
// import Spinner from '../common/Spinner'
// import './Auth.css'

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

// const mapStateToProps = () => ({})

// export default withRouter(connect(
//     mapStateToProps
// )(Header))