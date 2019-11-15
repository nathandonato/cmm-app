import React from 'react';
import TaskRow from './TaskRow.js';

class TaskRows extends React.Component {
  render() {
    const { tasks } = this.props
    return (
      tasks.map((task) => {
        return (
          <TaskRow
            key={task.id}
            task={task}
          />
        )
      })
    )
  }
}

export default TaskRows;
