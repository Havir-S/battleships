import React from 'react';


export default class MiddleBar extends React.Component {

  render() {
    return (
      <div className='middle-bar'>
        <div className="middle-bar-content">
          <div className='middle'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
