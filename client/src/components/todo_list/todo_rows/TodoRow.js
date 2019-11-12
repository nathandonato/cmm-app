import React from 'react';
import './TodoRow.css';

class TodoRow extends React.Component {
  render() {
    const { description, completed_at } = this.props.todo
    return (
      <div className='todo-row'>
        <div className='description'>
          {description}
        </div>
        <div className='completed'>
          {completed_at != null ? '√' : 'X' }
        </div>
      </div>
    )
  }
}

export default TodoRow;
