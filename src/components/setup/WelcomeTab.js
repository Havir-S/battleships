import React from 'react';

export default class WelcomeTab extends React.Component {

  render() {
    return (
      <div>
      Welcome Tab
      <button type="button" onClick={() => this.props.changeCurrentViewedTab(this.props.currentViewedTab,'add')}>Next</button>
      </div>
    )
  }
}
