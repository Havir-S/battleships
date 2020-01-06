import React from 'react';

class ShipConfiguration extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.ship);
    return (
      <div>
        hello {this.props.shipName}
      </div>
    )
  }
}

// {Object.keys(this.props.ships).map((ship) => (
//   <ShipSettingConfiguration key={ship} />
// ))}

export default class Setup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.ships);
    let shipNames = Object.keys(this.props.ships);
    let shipConfigurations = [];

    for (var i = 0; i < shipNames.length; i++) {
      shipConfigurations.push(
        <ShipConfiguration shipName={shipNames[i]} ship={this.props.ships[shipNames[i]]} />
      )
    }

    return (
      <div className="setup-screen">
        {shipConfigurations}
      </div>
    )
  }
}
