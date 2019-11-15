import React from 'react';
import { Button } from 'semantic-ui-react'

class StopButton extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(event, data) {
    event.preventDefault()
    const opts = { stopped_at: new Date() }
    this.props.stopTaskDuration(this.props.taskId, opts)
  }

  render() {
    const { taskId } = this.props

    return (
      <Button onClick={this.onClick}>
        Stop
      </Button>
    )
  }
}

export default StopButton;
