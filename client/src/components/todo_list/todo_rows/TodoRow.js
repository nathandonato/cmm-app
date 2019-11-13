import React from 'react';
import { Grid } from 'semantic-ui-react'
import TodoDescription from './TodoDescription.js';
import MarkTodoComplete from './MarkTodoComplete.js';
import RemoveTodo from './RemoveTodo.js';
import './TodoRow.css'

class TodoRow extends React.Component {
  render() {
    const { todo } = this.props

    return (
      <Grid.Row className='todo-row'>
        <Grid columns={3}>
          <Grid.Column width={1}>
            <MarkTodoComplete todo={todo} updateTodo={this.props.updateTodo}/>
          </Grid.Column>
          <Grid.Column width={13}>
             <TodoDescription todo={todo}/>
          </Grid.Column>
          <Grid.Column float='right' width={1}>
            <RemoveTodo todo={todo} removeTodo={this.props.removeTodo}/>
          </Grid.Column>
        </Grid>
      </Grid.Row>
    )
  }
}

export default TodoRow;
