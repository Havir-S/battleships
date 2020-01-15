import React from 'react';

class HealthPreview extends React.Component {

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
  render() {
    return (
      <div className='ship-row'>
        <span>{this.props.ship.name.toUpperCase()} </span>

        <div className='ship-config'>
          <span className='signAction' onClick={() => this.props.shipChange('subtract', 'amount', this.props.ship.name)}>-</span>
          <span>{this.props.ship.amount}</span>
          <span className='signAction' onClick={() => this.props.shipChange('add', 'amount', this.props.ship.name)}>+ </span>
        </div>
        {this.props.hasAdvancedShipSettings &&
        <div className='ship-config'>
          <span className='signAction' onClick={() => this.props.shipChange('subtract', 'health', this.props.ship.name)}> -</span>
          <span>{this.props.ship.health}</span>
          <span className='signAction' onClick={() => this.props.shipChange('add', 'health', this.props.ship.name)}>+</span>
        </div>
      }

      <HealthPreview health={this.props.ship.health} />
      </div>
    )
  }
}
