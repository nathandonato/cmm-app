import React from 'react';
import { Button } from 'semantic-ui-react'

class StartButton extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(event, data) {
    event.preventDefault()
    const opts = { task_id: this.props.taskId, started_at: new Date() }
    this.props.createTaskDuration(opts)
  }

  render() {
    const { taskId } = this.props

    return (
      <Button onClick={this.onClick}>
        Start
      </Button>
    )
  }
}

export default StartButton;
