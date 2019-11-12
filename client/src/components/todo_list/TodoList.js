import React from 'react';
import ListHeader from '../ListHeader.js';
import TodoRows from './todo_rows/TodoRows.js';
import './TodoList.css'

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoItems: []
    }
  }

  // TODO: Replace with a fetch
  componentDidMount() {
    const sampleList = require('./fake_todo_list.json');
    this.setState({ todoItems: sampleList })
  }

  render() {
    const { todoItems } = this.state
    return (
      <div className="todo-list">
        <ListHeader title='Todo list' />
        <TodoRows todos={todoItems} />
      </div>
    )
  }
}

export default TodoList;
