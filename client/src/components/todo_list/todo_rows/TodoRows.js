import React from 'react';
import TodoRow from './TodoRow.js';

class TodoRows extends React.Component {
  render() {
    const { todos } = this.props
    return (
      todos.map((todo) => {
        return (
          <TodoRow
            key={todo.id}
            todo={todo}
            updateTodo={this.props.updateTodo}
            removeTodo={this.props.removeTodo}
          />
        )
      })
    )
  }
}

export default TodoRows;
