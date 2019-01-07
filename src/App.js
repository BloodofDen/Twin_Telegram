import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'

import Messanger from './components/Messanger/Messanger'
import PersonalInfo from './components/PersonalInfo/PersonalInfo'
import DeleteMessage from './components/DeleteMessage/DeleteMessage'
// import NewConversation from './components/Messanger/NewConversation/NewConversation'

const AppStyle = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgba(230,235,239,1);
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

export default () => (
    <AppStyle>
        <Route path="/" component={Messanger} />
        <Route path="/personal_info" component={PersonalInfo} />
        <Route path="/m/:id/d" component={DeleteMessage} />
        {/* <Route path="/new_conversation" component={requireAuth(NewConversation)} /> */}
    </AppStyle>
)