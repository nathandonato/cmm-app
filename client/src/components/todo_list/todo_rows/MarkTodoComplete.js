import React from 'react';

class MarkTodoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    event.preventDefault()
    const completedAt = event.target.checked ? new Date() : null
    this.props.updateTodo(this.props.todo.id, { completed_at: completedAt })
  }

  render() {
    const { completed_at } = this.props.todo

    return (
      <div className='col-md-1'>
        <input
          type='checkbox'
          checked={completed_at != null}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default MarkTodoComplete;
