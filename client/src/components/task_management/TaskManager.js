import React from 'react';
import { Grid, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'
import TaskRows from './TaskRows.js'
import CustomerMenu from './CustomerMenu.js'
import ProjectMenu from './ProjectMenu.js'

class TaskManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: [],
      projects: [],
      tasks: [],
      selectedCustomerId: null,
      selectedProjectId: null,
      stale: false
    }

    this.getCustomers = this.getCustomers.bind(this)
    this.setCustomer = this.setCustomer.bind(this)
    this.setProject = this.setProject.bind(this)
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

  getCustomers() {
    fetch(`${window.location.origin}/api/v1/customers`, this.buildFetchOptions({method: 'GET'}))
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then(data => {
      this.setState({ customers: data, stale: false })
    })
    .catch(error => console.log(error));
  }

  getProjects() {
    const { selectedCustomerId } = this.state

    if (selectedCustomerId === null) {
      return
    }

    const fetchOpts = this.buildFetchOptions({ method: 'GET' })
    const apiUrl = `${window.location.origin}/api/v1/projects?customer_id=${selectedCustomerId}`
    fetch(apiUrl, fetchOpts)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then(data => {
      this.setState({ projects: data, stale: false })
    })
    .catch(error => console.log(error));
  }

  getTasks() {
    const { selectedProjectId } = this.state
    const apiUrl = `${window.location.origin}/api/v1/tasks?project_id=${selectedProjectId}`

    fetch(apiUrl, this.buildFetchOptions({method: 'GET'}))
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then(data => {
      this.setState({ tasks: data, stale: false })
    })
    .catch(error => console.log(error));
  }


  setCustomer(customerId) {
    const stateOptions = {
      selectedCustomerId: customerId, tasks: [], projects: [],
      selectedProjectId: null, stale: true
    }
    this.setState(stateOptions)
  }

  setProject(projectId) {
    this.setState({ selectedProjectId: projectId, stale: true })
  }

  componentDidMount() {
    this.getCustomers()
    this.getProjects()
    this.getTasks()
  }

  componentDidUpdate() {
    if (this.state.stale) {
      this.getCustomers()
      this.getProjects()
      this.getTasks()
    }
  }

  render() {
    const { customers, projects, selectedProjectId, tasks } = this.state

    return (
      <Grid style={{maxWidth: 600 }}>
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <CustomerMenu customers={customers} setCustomer={this.setCustomer} />
          </Grid.Column>
          <Grid.Column width={8}>
            <ProjectMenu projects={projects} setProject={this.setProject} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <TaskRows tasks={tasks} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default TaskManager;
