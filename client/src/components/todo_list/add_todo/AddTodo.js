import React from 'react';
import { Grid, Form, Input, Button, Icon } from 'semantic-ui-react'
import './AddTodo.css'

class AddTodo extends React.Component {
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
      this.props.addTodo(this.state)
      this.setState({ description: '' })
    }
  }

  render() {
    return (
      <Grid.Row className='todo-form'>
        <Form onSubmit={this.onSubmit}>
          <Form.Group inline>
            <Form.Field>
              <Input
                placeholder='Add todo list item...'
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

export default AddTodo;
