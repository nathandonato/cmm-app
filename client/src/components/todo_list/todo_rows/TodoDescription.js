import React from 'react';

class TodoDescription extends React.Component {
  render() {
    const { description, completed_at } = this.props.todo
    const completedClass = completed_at != null ? 'completed' : ''

    // TODO: Support in-line editing
    return (
      <div className='col-md-10'>
        <div className={`todo-description ${completedClass}`}>
          {description}
        </div>
      </div>
    )
  }
}

export default TodoDescription;
