import React from 'react';

class RemoveTodo extends React.Component {
  render() {
    const { id } = this.props.todo

    return (
        <button
          className='col-md-1 btn btn-danger btn-remove-todo btn-sm'
          onClick={(e) => this.props.removeTodo(id)}
        >
          x
        </button>
    )
  }
}

export default RemoveTodo;
