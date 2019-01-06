import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export default (Cmp) => {
    class Authenticate extends Component {
        
        componentWillMount() {
            const { isAuth } = this.props

            !isAuth && this.context.router.history.push('/auth')
        }

        render = () => <Cmp {...this.props} />

    }
    
    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }
    
    const mapStateToProps = ({ authUser: { isAuth } }) => ({ isAuth })
    return connect(mapStateToProps)(Authenticate)
}