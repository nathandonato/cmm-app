import React from 'react';
import LoginForm from './LoginForm.js'
import LogoutButton from './LogoutButton.js'

class AuthenticationPage extends React.Component {
  render() {
    return (
      <div>
        <LoginForm />
        <LogoutButton />
      </div>
    )
  }
}

export default AuthenticationPage;
