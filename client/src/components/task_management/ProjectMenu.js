import React from 'react';
import { Dropdown } from 'semantic-ui-react'

class ProjectMenu extends React.Component {
  render() {
    const { projects, setProject } = this.props

    const projectItems = projects.map(function(project) {
      return (
        <Dropdown.Item key={project.id} onClick={(e) => setProject(project.id)}>
          {project.description}
        </Dropdown.Item>
      )
    })

    return (
      <Dropdown text='Project'>
        <Dropdown.Menu>
          {projectItems}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default ProjectMenu;
