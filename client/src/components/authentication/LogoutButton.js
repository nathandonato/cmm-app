import React from 'react';
import { Button } from 'semantic-ui-react'

class LogoutButton extends React.Component {
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
      window.location.reload()
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <Button onClick={this.onClick}>Logout</Button>
    );
  }
}

export default LogoutButton;
