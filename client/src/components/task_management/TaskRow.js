import React from 'react';
import { Grid } from 'semantic-ui-react'
import StartButton from './StartButton.js'
import StopButton from './StopButton.js'
import DurationDisplay from './DurationDisplay.js'
import _ from 'lodash'

class TaskRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeDuration: null
    }
    this.createTaskDuration = this.createTaskDuration.bind(this)
    this.stopTaskDuration = this.stopTaskDuration.bind(this)
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

  createTaskDuration(durationOptions) {
    const body = { task_duration: durationOptions }
    const fetchOptions = this.buildFetchOptions({ method: 'POST', body: JSON.stringify(body) })
    fetch(`${window.location.origin}/api/v1/task_durations`, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then(data => { this.setState({ activeDuration: data }) })
    .catch(error => console.log(error));
  }

  stopTaskDuration(taskId, durationOptions) {
    console.log(this.state)
    console.log(taskId)
    const body = { task_duration: durationOptions }
    const fetchOptions = this.buildFetchOptions({ method: 'PUT', body: JSON.stringify(body) })
    fetch(`${window.location.origin}/api/v1/task_durations/${taskId}`, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then(data => {
      console.log(data)
      this.setState({ activeDuration: null })
    })
    .catch(error => console.log(error));
  }

  render() {
    const { id, description } = this.props.task
    const { activeDuration } = this.state

    return (
      <Grid.Row>
        <Grid columns={3}>
          <Grid.Column float='left' textAlign='left' width={11}>
             {description}
          </Grid.Column>
          <Grid.Column float='right' width={2}>
            <DurationDisplay activeDuration={activeDuration} />
          </Grid.Column>
          <Grid.Column float='right' width={1}>
            {(activeDuration === null) ? (
              <StartButton taskId={id} createTaskDuration={this.createTaskDuration} />
            ) : (
              <StopButton
                activeDuration={activeDuration}
                stopTaskDuration={this.stopTaskDuration} />
            )}
          </Grid.Column>
        </Grid>
      </Grid.Row>
    )
  }
}

export default TaskRow;
