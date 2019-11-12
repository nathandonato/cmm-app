import React from 'react';
import TodoRow from './TodoRow.js';

class TodoRows extends React.Component {
  render() {
    const { todos } = this.props
    const rows = todos.map((todo) => {
      return <TodoRow key={todo.id} todo={todo} />
    })

    return (
      <div>
        {rows}
      </div>
    )
  }
}

export default TodoRows;
