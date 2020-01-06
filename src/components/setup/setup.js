import React from 'react';
import ShipConfiguration from './ShipConfiguration.js';
import GridConfiguration from './GridConfiguration.js';


export default class Setup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {advancedShipSettings: false};
    this.advancedShipSettingsToggle = this.advancedShipSettingsToggle.bind(this);
  }

  advancedShipSettingsToggle() {
    this.setState({advancedShipSettings: !this.state.advancedShipSettings});
  }

  render() {
    let ships = this.props.ships;
    let shipNames = Object.getOwnPropertyNames(ships);
    let shipConfigurations = [];

    for (let i = 0; i < shipNames.length; i++ ) {
      shipConfigurations.push(
        <ShipConfiguration ship={ships[shipNames[i]]}
                           key={shipNames[i]}
                           hasAdvancedShipSettings={this.state.advancedShipSettings}
                           shipChange={this.props.shipChange}/>
      )
    }
    return (
      <div className="setup-screen">
        <div className='setup-ships'>
        {shipConfigurations}
        <button onClick={this.advancedShipSettingsToggle} type="button" >Show Advanced ship options</button>
        </div>

        <div className='setup-grid'>
          <GridConfiguration gridChangeSize={this.props.gridChangeSize}
                             field={this.props.field}
                             startValues={this.props.startValues}
                             gridChangeSizeInput={this.props.gridChangeSizeInput}
          />
        </div>
      </div>
    )
  }
}
