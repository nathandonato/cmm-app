import React from 'react';
import { Grid, Form, Input, Button, Icon } from 'semantic-ui-react'

class AddTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    if (this.state.description !== '') {
      this.props.addTask(this.state)
      this.setState({ description: '' })
    }
  }

  render() {
    const { show } = this.props

    return (
      <Grid.Row>
        <Form onSubmit={this.onSubmit}>
          <Form.Group inline>
            <Form.Field>
              <Input
                placeholder='Add new task for selected project...'
                name='description'
                value={this.state.description}
                onChange={this.onChange}
                autoComplete='off'
              />
            </Form.Field>
            <Button type='submit' className='btn-add-todo'>
              <Icon name='plus' className='marginless'/>
            </Button>
          </Form.Group>
        </Form>
      </Grid.Row>
    )
  }
}

export default AddTask;
