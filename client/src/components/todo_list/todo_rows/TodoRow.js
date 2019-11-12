import React from 'react';
import './TodoRow.css';
import TodoDescription from './TodoDescription.js';
import MarkTodoComplete from './MarkTodoComplete.js';
import RemoveTodo from './RemoveTodo.js';


class TodoRow extends React.Component {
  render() {
    const { todo } = this.props

    return (
      <div className='todo-row'>
        <MarkTodoComplete todo={todo} updateTodo={this.props.updateTodo}/>
        <TodoDescription todo={todo}/>
        <RemoveTodo todo={todo} removeTodo={this.props.removeTodo}/>
      </div>
    )
  }
}

export default TodoRow;
