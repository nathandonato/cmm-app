import React from 'react';
import './ListHeader.css';

class ListHeader extends React.Component {
  render() {
    const { title } = this.props
    return (
      <div className='row'>
        <div className="col-md-12 list-header">
          <h3>{title}</h3>
        </div>
      </div>
    )
  }
}

export default ListHeader;
