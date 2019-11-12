import React from 'react';
import './ListHeader.css';

class ListHeader extends React.Component {
  render() {
    const { title } = this.props
    return (
      <div className="list-header">
        <h3>{title}</h3>
      </div>
    )
  }
}

export default ListHeader;
