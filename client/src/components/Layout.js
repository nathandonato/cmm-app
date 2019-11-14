import React from 'react';
import Navbar from './Navbar.js'
import { Grid } from 'semantic-ui-react'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Grid centered>
          {this.props.children}
        </Grid>
      </div>
    )
  }
}

export default Layout;
