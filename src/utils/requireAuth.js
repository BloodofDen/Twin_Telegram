import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export default (Cmp) => {
    class Authenticate extends Component {
        
        componentWillMount() {
            const { isAuth } = this.props

            !isAuth && this.context.router.history.push('/auth')
        }

        render() {
            const { isAuth, ...rest } = this.props

            if(isAuth) {
                return <Cmp {...rest} />
            }

            return null
        }

    }
    
    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }
    
    const mapStateToProps = ({ authUser: { isAuth } }) => ({ isAuth })
    return connect(mapStateToProps)(Authenticate)
}