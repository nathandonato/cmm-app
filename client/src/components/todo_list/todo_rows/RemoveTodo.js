import React from 'react';
import { Button, Icon } from 'semantic-ui-react'

class RemoveTodo extends React.Component {
  render() {
    const { id } = this.props.todo

    return (
      <Button circular className='btn-remove-todo' onClick={(e) => this.props.removeTodo(id)}>
        <Icon name='trash' className='marginless'/>
      </Button>
    )
  }
}

export default RemoveTodo;
