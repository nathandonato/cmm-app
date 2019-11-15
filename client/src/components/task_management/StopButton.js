import React from 'react';
import { Button } from 'semantic-ui-react'

class StopButton extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(event, data) {
    event.preventDefault()
    const { id } = this.props.activeDuration
    const opts = { stopped_at: new Date() }
    this.props.stopTaskDuration(id, opts)
  }

  render() {
    return (
      <Button onClick={this.onClick}>
        Stop
      </Button>
    )
  }
}

export default StopButton;
