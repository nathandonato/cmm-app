import React from 'react';
import './AddTodo.css'

class AddTodo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    if (this.state.description != '') {
      this.props.addTodo(this.state)
      this.setState({ description: '' })
    }
  }

  render() {
    const { todo } = this.props

    return (
      <form className='add-todo' onSubmit={this.onSubmit}>
        <input
          type='text'
          placeholder='Add todo list item...'
          name='description'
          value={this.state.description}
          onChange={this.onChange}
          autocomplete='off'
        />
        <button type='submit'>+</button>
      </form>
    )
  }
}

export default AddTodo;
