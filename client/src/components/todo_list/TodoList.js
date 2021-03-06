import React from 'react';
import { Grid, Header } from 'semantic-ui-react'
import TodoRows from './todo_rows/TodoRows.js';
import AddTodo from './add_todo/AddTodo.js';
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
    this.addTodo = this.addTodo.bind(this)
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

  addTodo(todoOptions) {
    const body = { todo_item: todoOptions }
    const fetchOptions = this.buildFetchOptions({ method: 'POST', body: JSON.stringify(body) })
    fetch(`${this.state.apiUrl}`, fetchOptions)
    .then(() => this.setState({ stale: true }));
  }

  getTodoItems() {
    fetch(this.state.apiUrl, this.buildFetchOptions({method: 'GET'}))
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then(data => this.setState({ todoItems: data, stale: false }))
    .catch(error => console.log(error));
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
      <Grid.Column style={{ maxWidth: 450 }} className='todo-list'>
        <Grid.Row>
          <Header as='h2' textAlign='center' content='Todo list' style={{marginTop: '2px'}}/>
        </Grid.Row>
        <Grid.Row>
          <TodoRows
            todos={todoItems}
            updateTodo={this.updateTodo}
            removeTodo={this.removeTodo}
          />
        </Grid.Row>
        <Grid.Row>
          <AddTodo addTodo={this.addTodo}/>
        </Grid.Row>
      </Grid.Column>
    )
  }
}

export default TodoList;
