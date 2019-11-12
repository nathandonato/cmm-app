import React from 'react';

class TodoDescription extends React.Component {
  render() {
    const { id, description, completed_at } = this.props.todo
    const completedClass = completed_at != null ? 'completed' : ''

    // TODO: Support in-line editing
    return (
      <div className={`todo-description ${completedClass}`}>
        {description}
      </div>
    )
  }
}

export default TodoDescription;
