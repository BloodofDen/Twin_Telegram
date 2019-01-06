import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import randomColor from 'randomcolor'
import { SET_USER } from '../../redux/actions/actions'
import { signInUser, signUpUser } from '../../rest/index'
import Spinner from '../common/Spinner'
import './Auth.css'

class Auth extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isShowSignUpModal: true,
            isShowSpinner: false,
            user: {
                name: 'Denis',
                password: 'denisdenis',
                email: ''
            }
        }
    }

    toggleModals = () => this.setState(({ isShowSignUpModal }) => ({ isShowSignUpModal: !isShowSignUpModal }))

    toggleSpinner = () => this.setState(({ isShowSpinner }) => ({ isShowSpinner: !isShowSpinner }))

    logIn = async(e) => {
        e.preventDefault && e.preventDefault()
        this.toggleSpinner()

        const user = await signInUser(this.state.user)

        if(user) {
            this.hideError()
            
            this.props.SET_USER(user)
            this.redirect()
        } else {
            this.showError()
        }

        this.toggleSpinner()
    }

    signUp = async(e) => {
        e.preventDefault && e.preventDefault()
        this.toggleSpinner()

        const { user } = this.state

        if(!user.name || !user.password) return

        user.color = randomColor()

        const newUser = await signUpUser(user)

        this.props.SET_USER(newUser)
        this.toggleSpinner()

        this.redirect()
    }

    redirect() {
        this.context.router.history.push('/')
    }

    hideError = () => {
        [].forEach.call(
            document.querySelectorAll('input'),
            input => input.classList.remove('input-error')
        )

        const textError = document.querySelector('.text-error')
        textError.classList.add('slds-hide')
    }

    showError = () => {
        [].forEach.call(
            document.querySelectorAll('input'),
            input => input.classList.add('input-error')
        )

        const textError = document.querySelector('.text-error')
        textError.classList.remove('slds-hide')
    }

    handleChange = ({ target : { name, value } }) => {
        this.setState(({ user }) => {
            user[name] = value

            return { user }
        })
    }

    render() {
        const { user, isShowSpinner, isShowSignUpModal } = this.state

        return (
            <div className="login-page">
                <div className="form">
                    {isShowSignUpModal ? (
                        <form className="register-form" onSubmit={this.signUp}>
                            <input type="text" placeholder="Name" name="name" maxLength="20" value={user.name} onChange={this.handleChange}/>
                            <input type="email" placeholder="Email Address" name="email" maxLength="20" value={user.email} onChange={this.handleChange}/>
                            <input type="password" placeholder="Password" name="password" maxLength="20" value={user.password} onChange={this.handleChange}/>
                            <div className="slds-is-relative">
                                <button>Sign Up</button>
                                {isShowSpinner && <Spinner small hasContainer/>}
                            </div>
                            <p className="message">Already registered? <a href="javascript:void(0)" onClick={this.toggleModals}>Sign In</a></p>
                        </form>
                    ) : (
                        <form className="login-form" onSubmit={this.logIn}>
                            <input type="text" placeholder="Username" name="name" maxLength="20" value={user.name} onChange={this.handleChange}/>
                            <input type="password" placeholder="Password" name="password" maxLength="20" value={user.password} onChange={this.handleChange}/>
                            <p className="slds-m-bottom_small slds-text-align_left text-error slds-hide">Wrong username or password. Please correct it.</p>
                            <div className="slds-is-relative">
                                <button>Sign In</button>
                                {isShowSpinner && <Spinner small hasContainer/>}
                            </div>
                            <p className="message">Not registered? <a href="javascript:void(0)" onClick={this.toggleModals}>Create an account</a></p>
                        </form>
                    )}
                </div>
            </div>
        )
    }

}

Auth.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(
    () => ({}),
    { SET_USER }
)(Auth)