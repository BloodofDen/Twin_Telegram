import React from 'react'
import ReactDOM from 'react-dom'
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { store, history } from './redux/store'

import App from './App.js'
import Auth from './components/Auth/Auth'
import requireAuth from './utils/requireAuth'
import registerServiceWorker from './registerServiceWorker'

import { getUser } from './rest/index'

if(localStorage.Auth) {
    console.log('first dispatch')
    console.log(localStorage.Auth)

    store.dispatch({type: 'SET_USER', user: JSON.parse(localStorage.Auth)})

    const _id = JSON.parse(localStorage.Auth)._id
    getUser(_id).then(user => store.dispatch({ type: 'SET_USER', user }))
}

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" component={requireAuth(App)} />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'))
registerServiceWorker()