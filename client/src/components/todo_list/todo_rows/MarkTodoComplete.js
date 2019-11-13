import React from 'react';
import { Checkbox } from 'semantic-ui-react'

class MarkTodoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event, data) {
    event.preventDefault()
    const completedAt = data.checked ? new Date() : null
    this.props.updateTodo(this.props.todo.id, { completed_at: completedAt })
  }

  render() {
    const { completed_at } = this.props.todo

    return (
      <Checkbox checked={completed_at != null} onChange={this.onChange} />
    )
  }
}

export default MarkTodoComplete;
