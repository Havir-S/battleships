import React from 'react';
import ShipConfiguration from './ShipConfiguration.js';
import GridConfiguration from './GridConfiguration.js';


export default class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advancedShipSettings: false,
      advancedGridSettings: false
    };
    this.advancedShipSettingsToggle = this.advancedShipSettingsToggle.bind(this);
    this.advancedGridSettingsToggle = this.advancedGridSettingsToggle.bind(this);
  }

  advancedShipSettingsToggle() {
    this.setState({advancedShipSettings: !this.state.advancedShipSettings});
  }

  advancedGridSettingsToggle() {
    this.setState({advancedGridSettings: !this.state.advancedGridSettings});
  }

  render() {

    let ships,shipNames,shipConfigurations;

    /*a small adjustment until i find a better way to make it
      this component is going to be used twice(for now),
      and he second time won't need the ship configurations */

    if (this.props.currentViewedTab === 'shipsSettingsTab') {
      ships = this.props.ships;
      shipNames = Object.getOwnPropertyNames(ships);
      shipConfigurations = [];
    for (let i = 0; i < shipNames.length; i++ ) {
      shipConfigurations.push(
        <ShipConfiguration ship={ships[shipNames[i]]}
                           key={shipNames[i]}
                           hasAdvancedShipSettings={this.state.advancedShipSettings}
                           shipChange={this.props.shipChange}/>

      )
    }
  }
    return (
      <div className="setup-screen">
      {(() => {
      switch (this.props.currentViewedTab) {
        case 'sizeSettingsTab':
        return (
          <div className='setup-grid'>
          <GridConfiguration gridChangeSize={this.props.gridChangeSize}
                             field={this.props.field}
                             staticValues={this.props.staticValues}
                             startValues={this.props.startValues}
                             changeStartValues={this.props.changeStartValues}
                             toggleAdvancedGridSettings={this.advancedGridSettingsToggle}
                             hasAdvancedGridSettings={this.state.advancedGridSettings}
                             gridChangeSizeInput={this.props.gridChangeSizeInput}
          />
          <button onClick={() => this.props.changeCurrentViewedTab(this.props.currentViewedTab,'add')}
                  type="button">
                  Go forward
          </button>
          <button onClick={() => this.props.changeCurrentViewedTab(this.props.currentViewedTab,'subtract')}
                  type="button">
                  Go back
          </button>
        </div>
        )

        case 'shipsSettingsTab':
        return (
        <div className='setup-ships'>
          {shipConfigurations}
          <button onClick={this.advancedShipSettingsToggle} type="button" >Show Advanced ship options</button>
          <button onClick={() => this.props.changeCurrentViewedTab(this.props.currentViewedTab,'add')} type="button" >Go forward</button>
          <button onClick={() => this.props.changeCurrentViewedTab(this.props.currentViewedTab,'subtract')} type="button" >Go back</button>
        </div>
        )
        default:
        break;

      }
      })()}



      </div>
    )
  }
}
