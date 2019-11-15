import React from 'react';
import { Grid } from 'semantic-ui-react'
import _ from 'lodash'
import TaskRows from './TaskRows.js'

class TaskManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      stale: false
    }
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

  // Eventually we can scope this for a project and have a Project component
  // render a TaskManager
  getTasks() {
    fetch(`${window.location.origin}/api/v1/tasks`, this.buildFetchOptions({method: 'GET'}))
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then(data => this.setState({ tasks: data, stale: false }))
    .catch(error => console.log(error));
  }

  componentDidMount() {
    this.getTasks()
    console.log(this.state)
  }

  componentDidUpdate() {
    if (this.state.stale) {
      this.getTasks()
    }
  }

  render() {
    const { tasks } = this.state
    return (
      <Grid.Column style={{ maxWidth: 600 }}>
        <Grid.Row>
          <TaskRows
            tasks={tasks}
          />
        </Grid.Row>
      </Grid.Column>
    )
  }
}

export default TaskManager;
