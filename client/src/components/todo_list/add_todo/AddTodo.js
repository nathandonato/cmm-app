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
    if (this.state.description !== '') {
      this.props.addTodo(this.state)
      this.setState({ description: '' })
    }
  }

  render() {
    return (
      <div class='row'>
        <div class='col-md-12 add-todo'>
          <form className='form-inline todo-form' onSubmit={this.onSubmit}>
            <input
              className='form-control'
              type='text'
              placeholder='Add todo list item...'
              name='description'
              value={this.state.description}
              onChange={this.onChange}
              autoComplete='off'
            />
          <button className='btn btn-outline-secondary btn-add-todo' type='submit'>+</button>
          </form>
        </div>
      </div>

    )
  }
}

export default AddTodo;
