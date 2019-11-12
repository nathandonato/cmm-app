import React from 'react';
import ListHeader from '../ListHeader.js';
import TodoRows from './todo_rows/TodoRows.js';
import './TodoList.css'
import _ from 'lodash'

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apiUrl: `${window.location.origin}/api/v1/todo_items`,
      todoItems: [],
      stale: false
    }
    this.updateTodo = this.updateTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
  }

  buildFetchOptions(opts) {
    var defaults = {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    return _.extend(defaults, opts)
  }

  updateTodo(id, todoOptions) {
    const body = { todo_item: todoOptions }
    const fetchOptions = this.buildFetchOptions({ method: 'PUT', body: JSON.stringify(body) })
    fetch(`${this.state.apiUrl}/${id}`, fetchOptions)
    .then(() => this.setState({ stale: true }));
  }

  removeTodo(id) {
    fetch(`${this.state.apiUrl}/${id}`, this.buildFetchOptions({ method: 'DELETE' }))
    .then(() => this.setState({ stale: true }));
  }

  getTodoItems() {
    fetch(this.state.apiUrl, this.buildFetchOptions({method: 'GET'}))
    .then(response => response.json())
    .then(data => {
      this.setState({ todoItems: data, stale: false })
    });
  }

  componentDidMount() {
    this.getTodoItems()
  }

  componentDidUpdate() {
    if (this.state.stale) {
      this.getTodoItems()
    }
  }

  render() {
    const { todoItems } = this.state
    return (
      <div className="todo-list">
        <ListHeader title='Todo list' />
        <TodoRows
          todos={todoItems}
          updateTodo={this.updateTodo}
          removeTodo={this.removeTodo}
        />
      </div>
    )
  }
}

export default TodoList;
