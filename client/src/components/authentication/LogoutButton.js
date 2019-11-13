import React from 'react';
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    fetch(`${window.location.origin}/api/v1/authentication`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      // The localStorage flag 'isLoggedIn' is how our PrivateRoute component
      // will determine if the user is logged in.
      localStorage.removeItem('isLoggedIn')
      // This is react-router's way to redirect outside of a render().
      // The history prop comes from exporting this component wrapped in withRouter
      this.props.history.push('/')
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <Button onClick={this.onClick}>Logout</Button>
    );
  }
}

export default withRouter(LogoutButton);
