import React from 'react';

class RemoveTodo extends React.Component {
  render() {
    const { id } = this.props.todo

    return (
      <div className='remove-todo'>
        <button onClick={(e) => this.props.removeTodo(id)}>
          x
        </button>
      </div>
    )
  }
}

export default RemoveTodo;
