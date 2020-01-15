import React from 'react';

export default class TabTitle extends React.Component {

  render() {
    return (
      <div className='tab-title'>{this.props.title}</div>
    )
  }
}
