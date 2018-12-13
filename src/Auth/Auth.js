import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import Forms from './Forms'

import { connect } from 'react-redux'
import {
  initAuthChangeListeningAsyncAction,
  logOutAsyncAction,
  logInByGoogleAsyncAction,
  logInAsyncAction,
  passwordChangeAction,
  loginChangeAction
} from '../state/auth'

class Auth extends React.Component {
  componentDidMount() {
    this.props._initAuthChangeListeningAsyncAction()
  }

  render() {
    return (
      this.props._isUserLoggedIn ?
        <div>
          <FloatingActionButton
            style={{
              position: 'fixed',
              top: 10,
              right: 10,
              zIndex: 9999,
              color: 'white'
            }}
            secondary={true}
            onClick={this.props._logOutAsyncAction}
          >
            X
          </FloatingActionButton>
          {this.props.children}
        </div>
        :
        <Forms
          email={this.props._email}
          onEmailChangeHandler={this.props._loginChangeAction}
          password={this.props._password}
          onPasswordChangeHandler={this.props._passwordChangeAction}
          onLogInClick={this.props._logInAsyncAction}
          onLogInByGoogleClick={this.props._logInByGoogleAsyncAction}
        />
    )
  }
}

const mapStateToProps = state => ({
  _isUserLoggedIn: state.auth.isUserLoggedIn,
  _email: state.auth.email,
  _password: state.auth.password
})

const mapDispatchToProps = dispatch => ({
  _initAuthChangeListeningAsyncAction: () => dispatch(initAuthChangeListeningAsyncAction()),
  _logOutAsyncAction: () => dispatch(logOutAsyncAction()),
  _logInByGoogleAsyncAction: () => dispatch(logInByGoogleAsyncAction()),
  _logInAsyncAction: () => dispatch(logInAsyncAction()),
  _passwordChangeAction: (event) => dispatch(passwordChangeAction(event.target.value)),
  _loginChangeAction: (event) => dispatch(loginChangeAction(event.target.value)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)