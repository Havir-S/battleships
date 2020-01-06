import React from 'react';

class HealthPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let health = this.props.health
    let shipBar = [];
    for (var i = 0; i < health; i++) {
      shipBar.push(
        <div className="grid-preview-element" key={i} />
      )
    }
    return (
      <div className="grid-preview" style={{gridTemplateColumns : `repeat(${health}, 1fr)`}}>
      {shipBar}
      </div>
    )
  }
}

export default class ShipConfiguration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span>{this.props.ship.name} </span>

        <span onClick={() => this.props.shipChange('subtract', 'amount', this.props.ship.name)}>-</span>
        <span>amount</span>
        <span onClick={() => this.props.shipChange('add', 'amount', this.props.ship.name)}>+ </span>

        {this.props.hasAdvancedShipSettings &&
        <>
          <span onClick={() => this.props.shipChange('subtract', 'health', this.props.ship.name)}> -</span>
          <span>health</span>
          <span onClick={() => this.props.shipChange('add', 'health', this.props.ship.name)}>+</span>
        </>
      }

      <HealthPreview health={this.props.ship.health} />
      </div>
    )
  }
}