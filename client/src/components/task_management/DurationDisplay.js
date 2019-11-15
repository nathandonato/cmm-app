import React from 'react';
import Moment from 'react-moment'

class DurationDisplay extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const { activeDuration } = this.props

    return (
      (activeDuration == null) ? (
        <div></div>
      ) : (
        <Moment
          diff={activeDuration.started_at}
          durationFromNow
          interval={1000}
        />
      )
    )
  }
}

export default DurationDisplay;
