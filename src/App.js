import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Messanger from './components/Messanger/Messanger'
// import NewConversation from './components/Messanger/NewConversation/NewConversation'
import PersonalInfo from './components/Messanger/PersonalInfo/PersonalInfo'

const AppStyle = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgba(230,235,239,1);
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`

const App = ({ isAuth }) => (
    <AppStyle>
        { isAuth && <Route path="/" component={Messanger} /> }
        <Route exact path="/personal_info" component={PersonalInfo} />
        {/* <Route path="/new_conversation" component={requireAuth(NewConversation)} /> */}
        {/* <Route path="**" component={Feed} /> */}
    </AppStyle>
)

const mapStateToProps = ({ authUser: { isAuth } }) => ({ isAuth })
export default withRouter(
    connect(mapStateToProps)(App)
)