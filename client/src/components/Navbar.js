import React from 'react';
import { Menu } from 'semantic-ui-react'
import LogoutButton from './authentication/LogoutButton.js';

class Navbar extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item position='right'>
          <LogoutButton />
        </Menu.Item>
      </Menu>
    )
  }
}

export default Navbar;
