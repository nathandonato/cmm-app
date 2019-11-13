import React from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        password: '',
        email: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.missingRequiredFields = this.missingRequiredFields.bind(this);
  }

  missingRequiredFields() {
    const { email, password } = this.state.user;
    return (email.length === 0 || password.length === 0);
  }

  onChange(event) {
    const { name, value } = event.target
    this.setState({ user: { ...this.state.user, [name]: value} });
  }

  onSubmit(event) {
    event.preventDefault();
    fetch(`${window.location.origin}/api/v1/authentication`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      // The localStorage flag 'isLoggedIn' is how our PrivateRoute component
      // will determine if the user is logged in.
      localStorage.setItem('isLoggedIn', 'true')
      // This is react-router's way to redirect outside of a render().
      // The history prop comes from exporting this component wrapped in withRouter
      this.props.history.push('/')
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large' onSubmit={this.onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              type='email'
              name='email'
              placeholder='Email address'
              onChange={this.onChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              type='password'
              name='password'
              placeholder='Password'
              onChange={this.onChange}
            />
            <Button color='blue' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    );
  }
}

export default withRouter(LoginForm);
